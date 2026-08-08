# Audio File Storage & Access Control

App: `apps/back` + nginx (`infra/nginx/`)

Audio binaries live on disk; only metadata lives in Postgres. nginx serves the
files and asks the backend for an access decision before handing any file over.

## Where files live

```
<MEDIA_ROOT>/audio/<ownerId>/<audioFileId>.wav
<MEDIA_ROOT>/audio/<ownerId>/<audioFileId>.peaks
```

`MEDIA_ROOT` defaults to `/var/www/media` and is the root shared by every kind of
uploaded file, one subdirectory each (`audio/` here). In dev it maps to
`infra/media_data/` on the host; in prod to the `media_data` Docker volume (see
[infra.md](../infra.md)). The path key is `ownerId` (the `Owner` model), not
`userId`.

The disk layout is invisible to clients: nginx roots at `/var/www/media`, so the
public URL stays `/audio/<ownerId>/<audioFileId>.wav`.

Every `.wav` has a `.peaks` sidecar next to it — same UUID, different extension —
holding a precomputed amplitude envelope so the browser can draw a waveform
without downloading the audio. See [peaks.md](../peaks.md) for the format.

## Data model

`AudioFile` (`apps/back/prisma/schema.prisma`) — metadata only: `ownerId`,
`name`, `family?`, `kind?`, `bpm?`, `key?`, `mode?`, `visibility` (`PRIVATE` /
`SHARED` / `PUBLIC`), `url`, `duration` (ms, `Float`), `bytes`, `createdAt`.
There is no `mime_type` column; the binary is addressed by `ownerId`/`id` on disk
(`name` is the client-supplied display label, never the disk path).

The API also returns `peaksUrl`, which is **not** a column: the repository's
`_format` derives it from `url` by swapping the extension.

`duration` and `bytes` (size) are derived from the audio file itself server-side
— see [wav.md](../wav.md) for how to interpret a `.wav`'s bytes.

## Access control (nginx `auth_request`)

For every `/audio/` request, nginx fires an internal sub-request to the backend,
which answers 200 / 401 / 403:

```nginx
# infra/nginx/media.conf  (prod; dev uses media.dev.conf → host.docker.internal:8080)
location /audio/ {
  auth_request /auth/check-access;
  root /var/www/media;
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
a mistyped path 404s, which `auth_request` turns into a 500, so _every_ audio
file becomes unreachable while the app otherwise looks healthy.

The backend handler (`checkAccess` in `controllers/auth.ts`) runs the
`authenticate` hook, parses `<ownerId>/<audioFileId>.<ext>` out of the
`X-Original-URI` path, then allows the file if it is `PUBLIC` / `SHARED` or the
requester owns it.

Two rules that are easy to break:

- **The identity comes from the session, never from the request.**
  `checkAccess` resolves the owner from `req.authUser.id`, like every other
  controller. Taking a user id from the URL would mean the caller picks whose
  permissions are checked, which is not a permission check at all.
- **It must only ever answer 200, 401 or 403.** `auth_request` maps anything
  else — a 400 on a malformed path, a 404 on a missing row — to a **500** for
  the client, with the real status visible only in the nginx container log. Any
  failure path here therefore returns 403 (fail closed), including "sample not
  found", which also avoids leaking whether an id exists.

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
  (`services/wav.ts` → `wavManager.decodeWav` → `duration`, `bytes`, and the
  per-channel `Float32Array`s), writes the `.peaks` sidecar
  (`msnpManager.generatePeaks`), enforces the per-owner quota
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
- `DELETE /delete?id=` — removes the disk files (`.wav` **and** `.peaks`) then
  the row (owner-checked).

Seeds still populate the platform/user samples directly (`scripts/seed/`);
`seed/meta.ts` derives `family`/`kind`/`bpm` from the filename.

`services/audioStorage.ts` provides `write`, `writeStream`, `remove`, and
`deleteDirectory(ownerId)`. The caller generates the UUID and passes it in, so
the `.wav` and its `.peaks` share one.

Clients reach `/audio/` with a **relative** path (`/audio/<url>`), routed by the
reverse proxy in prod and by each app's Vite dev proxy in dev — see
[infra.md](../infra.md). `url` and `peaksUrl` are storage keys
(`<ownerId>/<uuid>.<ext>`), not URLs: the `/audio/` prefix is added by the
consumer, so the same value works behind any mount point. Requests go through
`apiFetch` so the cookie travels (the `auth_request` above needs it) and a 401
triggers the same global logout as any other call.

The studio still appends `?sampleId=…&userId=…` (`apps/studio/src/lib/audioUtils.ts`).
Those parameters are vestigial — `checkAccess` ignores the query string — and can
be dropped whenever that file is next touched.

The on-disk filename is always a server-generated `{uuid}.{ext}` — the client
filename is stored only as `AudioFile.name`, never used to build the path (no
`../` path traversal).
