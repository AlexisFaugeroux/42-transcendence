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
`name`, `family?`, `kind?`, `bpm?`, `key?`, `mode?`, `visibility` (`PRIVATE` /
`SHARED` / `PUBLIC`), `url`, `duration` (ms, `Float`), `bytes`, `createdAt`.
There is no `mime_type` column; the binary is addressed by `ownerId`/`id` on disk
(`name` is the client-supplied display label, never the disk path).

`duration` and `bytes` (size) are derived from the audio file itself server-side
— see [wav.md](../wav.md) for how to interpret a `.wav`'s bytes.

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

## API (`/api/audio`, `routes/audioFile.ts`)

All authenticated. Registered with prefix `/api/audio` in `app.ts`.

- `GET /get` — lists the caller's `AudioFile`s **plus** the platform owner's,
  with optional filters (`ids/bpms/keys/modes/families/kinds/visibilities`).
- `POST /upload` — `multipart/form-data` (`@fastify/multipart`). Streams the file
  to disk (`audioStorageService.writeStream`), parses the WAV server-side
  (`utils/wav.ts` → `duration`, `bytes`), enforces the per-owner quota
  (`AUDIO_USER_QUOTA_BYTES`, `413` on overflow), then creates the row. Fields
  (`visibility`, `bpm?`, `key?`, `mode?`, `family?`, `kind?`) are validated in
  `utils/validation.ts`; `duration` is **never** trusted from the client. On any
  failure the streamed file is rolled back (`audioStorageService.remove`).
- `DELETE /delete?id=` — removes the disk file then the row (owner-checked).

Seeds still populate the platform/user samples directly (`scripts/seed/`);
`seed/meta.ts` derives `family`/`kind`/`bpm` from the filename.

`services/audioStorage.ts` provides `writeStream`, `remove`, and
`deleteDirectory(ownerId)`.

The on-disk filename is always a server-generated `{uuid}.{ext}` — the client
filename is stored only as `AudioFile.name`, never used to build the path (no
`../` path traversal).
