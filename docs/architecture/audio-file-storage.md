# Audio File Storage & Access Control

App: `apps/back` + nginx (`infra/nginx/`)

Audio binaries live on disk; only metadata lives in Postgres. nginx serves the
files and asks the backend for an access decision before handing any file over.

## Where files live

```
<AUDIO_ROOT>/<ownerId>/<audioFileId>.wav
```

`AUDIO_ROOT` defaults to `/var/www/audio`. In dev it maps to `infra/audio_data/`
on the host; in prod to the `audio_data` Docker volume (see [infra.md](../infra.md)).
The path key is `ownerId` (the `Owner` model), not `userId`.

## Data model

`AudioFile` (`apps/back/prisma/schema.prisma`) — metadata only: `ownerId`,
`bpm?`, `key?`, `visibility` (`PRIVATE` / `SHARED` / `PUBLIC`), `url`, `length`,
`bytes`. There is no `filename` / `mime_type` column; the binary is addressed by
`ownerId`/`id` on disk.

`length` (duration) and `bytes` (size) are read from the audio file itself — see
[wav.md](../wav.md) for how to interpret a `.wav`'s bytes.

## Access control (nginx `auth_request`)

For every `/audio/` request, nginx fires an internal sub-request to the backend,
which answers 200 / 403 / 404:

```nginx
# infra/nginx/audio.conf  (prod; dev uses audio.dev.conf → host.docker.internal:8080)
location /audio/ {
  auth_request /auth/check-access;
  root /var/www;
}
location = /auth/check-access {
  internal;
  proxy_pass http://back:8080/api/audio/check-access;
  proxy_set_header X-Original-URI $request_uri;
  proxy_set_header Cookie $http_cookie;
}
```

The backend handler (`checkAccess` in `controllers/auth.ts`) runs the
`authenticate` hook, then allows the file if it is `PUBLIC` / `SHARED` or the
requester owns it (else 403; 404 if missing).

## Uploads

No upload endpoint yet — files arrive via seeds / the prod image unpacking
`samples/*.zip`. `services/audioStorage.ts` only implements
`deleteDirectory(ownerId)`. Upload + validation (type, size, filename
sanitization, quotas) is still to be built.
