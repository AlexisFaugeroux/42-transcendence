# Audio File Storage & Access Control

App: `apps/back` + nginx (`infra/nginx/`)

Audio binaries live on disk; only metadata lives in Postgres. nginx serves the
files and asks the backend for an access decision before handing any file over.

Two kinds of audio live here: **samples** (uploaded building blocks) and
**tracks** (rendered project exports). They share the storage code, the WAV
parsing, the `.peaks` sidecar and the access-control path; they differ in the
quota and in who may create them. Avatars share the volume but not the machinery.

## Where files live

```
<MEDIA_ROOT>/samples/<ownerId>/<sampleId>.wav
<MEDIA_ROOT>/samples/<ownerId>/<sampleId>.peaks
<MEDIA_ROOT>/tracks/<ownerId>/<trackId>.wav
<MEDIA_ROOT>/tracks/<ownerId>/<trackId>.peaks
<MEDIA_ROOT>/avatars/…
```

`MEDIA_ROOT` defaults to `/var/www/media` and is the root shared by every kind of
uploaded file, one subdirectory each. In dev it is `../../infra/media_data`
**relative to `apps/back`** — the app runs on the host, so the path has to climb
out of the app to reach the repo folder `nginx-media` mounts; in prod it is the
`media_data` Docker volume (see [infra.md](../infra.md)). The path key is
`ownerId` (the `Owner` model), not `userId`.

The subdirectory is named `samples/`, not `audio/`, because tracks now sit beside
it under their own kind — "audio" would not say which of the two you are looking
at.

The disk layout is invisible to clients: nginx roots at `/var/www/media`, so the
public URLs stay `/samples/<ownerId>/<sampleId>.wav` and
`/tracks/<ownerId>/<trackId>.wav`.

### One storage class, two instances

`services/audio/audioStorage.ts` holds all the logic — `write`, `writeStream`,
`remove`, `deleteDirectory(ownerId)`, and a private `_path` — as a class taking
its root in the constructor. `sampleStorage.ts` and `trackStorage.ts` are two
one-line subclasses instantiated on `<MEDIA_ROOT>/samples` and
`<MEDIA_ROOT>/tracks`. Adding a third kind of audio is a two-line file, and there
is no way for the two to drift apart in how they name or clean up files.

`remove(uuid, ownerId)` always unlinks **both** the `.wav` and the `.peaks`, and
swallows per-file errors — it is called on rollback paths where a missing file is
the normal case, not a failure.

> **`ownerId` is the resource owner's, never the caller's.** The two are the same
> value for as long as only owners delete their own files, which is why passing
> `user.ownerId` went unnoticed until moderation shipped: a moderator deleting
> somebody else's track made the server look in the wrong directory, drop the row
> and leave the `.wav` and `.peaks` orphaned on the volume. Read the id off the
> resource (`track.ownerId`). See [permissions.md](./permissions.md).

`writeStream` is also where the size limit is enforced: `@fastify/multipart` sets
`stream.truncated` when the file exceeded `MAX_UPLOAD_BYTES` (100 MiB), and the
method deletes what it wrote and throws `PayloadTooLargeError`. Checking a
`Content-Length` header instead would trust the client.

Every `.wav` has a `.peaks` sidecar next to it — same UUID, different extension —
holding a precomputed amplitude envelope so the browser can draw a waveform
without downloading the audio. See [peaks.md](../peaks.md) for the format.

## Data model

`Sample` (`apps/back/prisma/schema.prisma`) — metadata only: `ownerId`,
`name`, `family?`, `kind?`, `bpm?`, `key?`, `mode?`, `visibility` (`PRIVATE` /
`SHARED` / `PUBLIC`), `url`, `duration` (ms, `Float`), `bytes`, `createdAt`.
There is no `mime_type` column; the binary is addressed by `ownerId`/`id` on disk
(`name` is the client-supplied display label, never the disk path).

The API also returns `peaksUrl`, which is **not** a column: the repository's
`_format` derives it from `url` by swapping the extension.

`duration` and `bytes` (size) are derived from the audio file itself server-side
— see [wav.md](../wav.md) for how to interpret a `.wav`'s bytes.

## Access control (nginx `auth_request`)

For every `/samples/` **and** `/tracks/` request, nginx fires an internal
sub-request to the backend, which answers 200 / 401 / 403. `/avatars/` is served
without `auth_request` — an avatar is public by nature, and gating it would put a
DB read in front of every rendered profile picture:

```nginx
# infra/nginx/media.conf  (prod; dev uses media.dev.conf → host.docker.internal:8080)
location /samples/ {
  auth_request /auth/check-access;
  root /var/www/media;
}
location /tracks/ {
  auth_request /auth/check-access;
  root /var/www/media;
}
location /avatars/ {
  root /var/www/media;   # no auth_request
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
the `/api/auth` prefix, not `/api/samples`. Getting it wrong is silent and total:
a mistyped path 404s, which `auth_request` turns into a 500, so _every_ sample
becomes unreachable while the app otherwise looks healthy.

The backend handler (`checkAccess` in `controllers/auth/auth.ts`) runs the
`authenticate` hook, parses `<kind>/<ownerId>/<fileId>.<ext>` out of the
`X-Original-URI` path, then allows the file if it is `PUBLIC` / `SHARED` or the
requester owns it.

**The first path segment selects the repository.** `checkAccess` accepts exactly
`samples` and `tracks`, and dispatches to `sampleRepository` or `trackRepository`
accordingly. Anything else is a 403 — the allow-list is what stops a new nginx
`location` from accidentally inheriting an access check that reads the wrong
table. The visibility rule itself is identical for both, which is why one handler
covers both kinds instead of two near-copies.

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

## API (`/api/samples`, `routes/sample.ts`)

All authenticated. Registered with prefix `/api/samples` in `app.ts`.

- `GET /get` — lists the caller's `Sample`s **plus** the platform owner's,
  with optional filters (`ids/bpms/keys/modes/families/kinds/visibilities`).
- `GET /storage` — the caller's quota usage:
  `{ usedBytes, quotaBytes, byFamily: [{ family, bytes }] }`. `usedBytes` and the
  per-family breakdown are aggregated in SQL (`sumBytes`, `sumBytesByFamily`),
  never by summing rows in JS; `quotaBytes` is `SAMPLE_USER_QUOTA_BYTES`. The
  `family` of a breakdown entry is nullable — files uploaded without one are
  grouped under `null` rather than dropped, so the parts always add up to
  `usedBytes`.
- `POST /upload` — `multipart/form-data` (`@fastify/multipart`). Streams the file
  to disk (`sampleStorageService.writeStream`), parses the WAV server-side
  (`services/wav.ts` → `wavManager.decodeWav` → `duration`, `bytes`, and the
  per-channel `Float32Array`s), writes the `.peaks` sidecar
  (`msnpManager.generatePeaks`), enforces the per-owner quota
  (`SAMPLE_USER_QUOTA_BYTES`, `413` on overflow), then creates the row. Fields
  (`visibility`, `bpm?`, `key?`, `mode?`, `family?`, `kind?`) are validated in
  `utils/validation.ts`; `duration` is **never** trusted from the client. On any
  failure the streamed file is rolled back (`sampleStorageService.remove`).
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

The caller generates the UUID and passes it in, so the `.wav`, its `.peaks` and
the database row all share one id.

## API (`/api/tracks`, `routes/track.ts`)

All authenticated, same RPC shape as samples: `GET /get`, `POST /upload`,
`PUT /update?id=`, `DELETE /delete?id=`. Plus, on the social side,
`GET /api/users/:handle/tracks` for another producer's public tracks.

`POST /upload` mirrors the sample pipeline — stream to disk, decode the WAV
server-side, write the `.peaks` sidecar, create the row, roll the file back on
any failure — with three differences:

- **No quota.** Samples are checked against `SAMPLE_USER_QUOTA_BYTES`; tracks are
  not checked against anything beyond `MAX_UPLOAD_BYTES` per file. That is a gap,
  not a decision: a user can currently fill the volume with exports.
- **Different metadata.** `title` and `description` instead of `name`, plus an
  optional `projectId` linking the export back to the session that produced it.
- **A missing envelope is not fatal.** If `decodeWav` returns no channel data the
  handler logs a warning and creates the row without a `.peaks` file, rather than
  failing the upload. The waveform is a nicety; the audio is the deliverable.

`peaksUrl` is derived in `trackRepository._format` by swapping the extension, the
same way as for samples — it is not a column.

The producer of these files is the studio: `useOfflineRender` renders the project
faster than real time, `ExportModal` collects the metadata and posts the result.
See [studio-devices.md](./studio-devices.md) for where that sits in the studio.

Clients reach `/samples/` with a **relative** path (`/samples/<url>`), routed by
the reverse proxy in prod and by each app's Vite dev proxy in dev — see
[infra.md](../infra.md). `url` and `peaksUrl` are storage keys
(`<ownerId>/<uuid>.<ext>`), not URLs: the `/samples/` prefix is added by the
consumer, so the same value works behind any mount point. Requests go through
`apiFetch` so the cookie travels (the `auth_request` above needs it) and a 401
triggers the same global logout as any other call.

The studio still appends `?sampleId=…&userId=…` (`apps/studio/src/lib/audioUtils.ts`,
still true as of the devices epic). Those parameters are vestigial — `checkAccess`
splits the URI on `?` and ignores the query string — and can be dropped whenever
that file is next touched.

The on-disk filename is always a server-generated `{uuid}.{ext}` — the client
filename is stored only as `Sample.name`, never used to build the path (no
`../` path traversal).
