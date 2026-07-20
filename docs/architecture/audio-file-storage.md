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
  proxy_pass http://back:8080/api/auth/check-access;
  proxy_pass_request_body off;
  proxy_set_header Content-Length "";
  proxy_set_header X-Original-URI $request_uri;
  proxy_set_header Cookie $http_cookie;
}
```

The upstream path is `/api/auth/check-access` — the handler is registered under
the `/api/auth` prefix, not `/api/audio`. Getting it wrong is silent and total:
`auth_request` denies on any non-2xx, so a 404 from a mistyped path makes _every_
audio file unreachable while the app otherwise looks healthy.

The backend handler (`checkAccess` in `controllers/auth.ts`) runs the
`authenticate` hook, then allows the file if it is `PUBLIC` / `SHARED` or the
requester owns it (else 403; 404 if missing).

## API (`/api/audio`, `routes/audioFile.ts`)

All authenticated. Registered with prefix `/api/audio` in `app.ts`.

- `GET /get` — lists the caller's `AudioFile`s **plus** the platform owner's,
  with optional filters (`ids/bpms/keys/modes/families/kinds/visibilities`).
- `GET /storage` — the caller's quota usage:
  `{ usedBytes, quotaBytes, byFamily: [{ family, bytes }] }`. `usedBytes` and the
  per-family breakdown are aggregated in SQL (`sumBytes`, `sumBytesByFamily`),
  never by summing rows in JS; `quotaBytes` is `AUDIO_USER_QUOTA_BYTES`. The
  `family` of a breakdown entry is nullable — files uploaded without one are
  grouped under `null` rather than dropped, so the parts always add up to
  `usedBytes`.
- `POST /upload` — `multipart/form-data` (`@fastify/multipart`). Streams the file
  to disk (`audioStorageService.writeStream`), parses the WAV server-side
  (`utils/wav.ts` → `duration`, `bytes`), enforces the per-owner quota
  (`AUDIO_USER_QUOTA_BYTES`, `413` on overflow), then creates the row. Fields
  (`visibility`, `bpm?`, `key?`, `mode?`, `family?`, `kind?`) are validated in
  `utils/validation.ts`; `duration` is **never** trusted from the client. On any
  failure the streamed file is rolled back (`audioStorageService.remove`).
- `PUT /update?id=` — partial metadata edit: `name`, `visibility`, `bpm`, `key`,
  `mode`, `family`, `kind`. `minProperties: 1` rejects an empty body. The optional
  enums accept `null` so a field can be **cleared** (`family: null` unsets it),
  while `visibility` does not — a file always has one. Nothing here touches the
  file on disk, so `url`, `duration` and `bytes` are not editable: they are
  derived server-side and a client must not be able to contradict them.
- `DELETE /delete?id=` — removes the disk file then the row (owner-checked).

Seeds still populate the platform/user samples directly (`scripts/seed/`);
`seed/meta.ts` derives `family`/`kind`/`bpm` from the filename.

`services/audioStorage.ts` provides `writeStream`, `remove`, and
`deleteDirectory(ownerId)`.

Clients reach `/audio/` with a **relative** path (`/audio/<url>?sampleId=…&userId=…`),
routed by the reverse proxy in prod and by each app's Vite dev proxy in dev — see
[infra.md](../infra.md). Requests go through `apiFetch` so the cookie travels
(the `auth_request` above needs it) and a 401 triggers the same global logout as
any other call.

The on-disk filename is always a server-generated `{uuid}.{ext}` — the client
filename is stored only as `AudioFile.name`, never used to build the path (no
`../` path traversal).
