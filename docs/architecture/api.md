# HTTP API map

App: `apps/back` — every prefix registered in `src/app.ts`.

A one-page inventory. The per-domain reasoning lives in
[audio-file-storage.md](./audio-file-storage.md),
[chat.md](./chat.md), [realtime.md](./realtime.md),
[permissions.md](./permissions.md) and
[../authentication.md](../authentication.md).

## Prefixes

| Prefix         | Route file            | Scope                                        |
| -------------- | --------------------- | -------------------------------------------- |
| `/api/ws`      | `routes/websocket.ts` | the single WebSocket                         |
| `/api/auth`    | `routes/auth.ts`      | register, login, session, media access check |
| `/api/user`    | `routes/user.ts`      | **your own** account and profile             |
| `/api/users`   | `routes/producer.ts`  | **other** producers, and the follow graph    |
| `/api/samples` | `routes/sample.ts`    | sample library                               |
| `/api/tracks`  | `routes/track.ts`     | rendered exports                             |
| `/api/project` | `routes/project.ts`   | studio project persistence                   |
| `/api/chat`    | `routes/chat.ts`      | direct messages                              |
| `/api/admin`   | `routes/admin.ts`     | back-office: accounts, sessions, moderation  |

> **`/api/user` and `/api/users` are two different route files.** Singular is
> yourself, identified by the session; plural is somebody else, identified by a
> `:handle`. The near-identical names are a trap — check which one you are in
> before adding a route.

## Two path styles, on purpose

Most of the API is **RPC**: the verb is in the path and the id is in the
querystring.

```
GET    /api/samples/get?ids=…
POST   /api/samples/upload
PUT    /api/samples/update?id=…
DELETE /api/samples/delete?id=…
PUT    /api/user/update/profile
PUT    /api/project/save
```

`routes/producer.ts` is the one exception and **is** REST-ish:

```
GET    /api/users/
GET    /api/users/:handle
GET    /api/users/:handle/followers
GET    /api/users/:handle/following
POST   /api/users/:handle/follow
DELETE /api/users/:handle/follow
GET    /api/users/:handle/tracks
GET    /api/users/:handle/liked
```

The split follows what the identifier _is_. Everywhere else the id is an internal
uuid — an opaque value the client received from a previous response, which belongs
in a querystring. A `handle` is a public, user-chosen, human-typed name: it is the
name of a resource, and `/users/alice/followers` reads the way the URL should. It
is also the only place where a URL is meant to be shareable.

Stay in the RPC style for new endpoints unless you are adding to the producer
routes.

## Routes

### `/api/auth`

| Route                | Auth | Rate limit | Notes                                              |
| -------------------- | ---- | ---------- | -------------------------------------------------- |
| `POST /register`     | —    | 5/min      | no auto-login, no cookie set                       |
| `POST /login`        | —    | 5/min      | sets the `token` cookie                            |
| `GET  /me`           | ✓    | —          | current user, never the password hash              |
| `POST /logout`       | ✓    | —          | revokes the session row, clears cookie             |
| `GET  /check-access` | ✓    | —          | nginx `auth_request` target — **200/401/403 only** |

### `/api/user` (yourself)

| Route                     | Notes                                 |
| ------------------------- | ------------------------------------- |
| `PUT    /update/profile`  | profile fields and `links`            |
| `PUT    /update/password` | re-hashes with scrypt                 |
| `POST   /upload/avatar`   | multipart; `AVATAR_MAX_BYTES` = 5 MiB |
| `DELETE /delete/avatar`   |                                       |
| `GET    /listFollowing`   | who you follow                        |
| `GET    /listFollowers`   | who follows you                       |
| `DELETE /delete`          | deletes the account                   |

### `/api/users` (other producers)

All authenticated. `GET /`, `/:handle/followers`, `/:handle/following` and
`/:handle/liked` accept `page` / `limit` / `q` and answer the paginated envelope
`{ items, total, page, limit }` — the old `{ producers: [...] }` wrapper is gone
(`PublicProducersResponse` was replaced by `PaginatedProducersResponse`). `q`
matches `handle` and `artistName` on producer lists, and track `title` on
`/:handle/liked`, case-insensitively. See [../pagination.md](../pagination.md).

`/:handle/liked` lists tracks that producer liked, **public only** (same filter
on `total`). `follow` / `unfollow` / `:handle/tracks` are rate-limited to 5/min.
`handle` is validated by a shared `handleParamsSchema` (`^[\w.]+$`, 3–32 chars).

### `/api/samples` and `/api/tracks`

Same four verbs each — `GET /get`, `POST /upload`, `PUT /update?id=`,
`DELETE /delete?id=` — plus `GET /api/samples/storage` for quota usage. Details,
including the differences between the two upload pipelines, in
[audio-file-storage.md](./audio-file-storage.md).

Writing is gated: `sample:write` on the sample upload/update/delete,
`track:write` on the track upload/update. Reading is not — a listener account can
browse and play. `DELETE /api/tracks/delete` carries no `authorize` because its
rule is _owner **or** `track:moderate`_, which the controller checks itself.

`GET /api/samples/get` also takes `page` / `limit` / `q` (matching `name`) and
returns the paginated envelope; the studio omits both paging params and reads
`items` (see [../pagination.md](../pagination.md)). `/api/tracks/get` is not
paginated — the tracks page filters and sorts client-side.

Tracks also expose likes (RPC, id in querystring):

| Route                | Notes                                                              |
| -------------------- | ------------------------------------------------------------------ |
| `POST   /like?id=`   | idempotent; 400 if liking your own track                           |
| `DELETE /unlike?id=` | idempotent                                                         |
| `GET    /liked`      | my liked tracks, newest like first; `page` / `limit` / `q` (title) |

Every track payload from `GET /get`, `/:handle/tracks`, and the liked lists
includes `likesCount` and `isLiked` (viewer).

### `/api/project`

| Route                | Notes                                                          |
| -------------------- | -------------------------------------------------------------- |
| `PUT    /save`       | requires `id, name, bpm, duration, visibility, samples, state` |
| `GET    /load?id=`   | returns the serialized project state                           |
| `GET    /list`       | the caller's projects                                          |
| `PUT    /update?id=` | `name` and/or `archived`, `minProperties: 1`                   |
| `DELETE /delete?id=` |                                                                |

All five require `studio:access`, so a listener account cannot persist a project
even by calling the API directly.

`save` is a `PUT` with a client-supplied `id`, not a `POST`: the studio generates
the project id, so saving is idempotent — the same call creates or overwrites, and
a retried save after a flaky connection cannot produce two projects.

`update` only accepts `name` and `archived`. Everything else about a project comes
from its serialized `state`, so letting a client patch `bpm` or `duration`
independently would let the metadata contradict the payload. Archiving is a flag
rather than a delete because a session may already have published tracks pointing
at it.

### `/api/admin`

The back-office. Every route is `[app.authenticate, app.authorize(<permission>)]`
and rate-limited to 60/min. The permission is the entire access rule; the
controllers add business guards on top of it, never a second role check.

| Route                      | Permission       | Notes                                                                                             |
| -------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `GET    /users/get`        | `user:read`      | `page` / `limit` / `q`, `q` on handle, artistName, email                                          |
| `PUT    /users/update`     | `user:write`     | same profile fields as `/api/user/update/profile`                                                 |
| `PUT    /users/role`       | `user:write`     | 400 on self, 409 on downgrading the last admin                                                    |
| `GET    /users/sessions`   | `session:revoke` | the target's valid sessions                                                                       |
| `POST   /users/revoke`     | `session:revoke` | revokes all of them **and closes their sockets**                                                  |
| `DELETE /users/delete?id=` | `user:delete`    | 400 on self, 409 on the last admin; wipes the row, the samples, the tracks and every file on disk |
| `GET    /tracks/get`       | `track:moderate` | every track on the platform; `page` / `limit` / `q` (title or artist name)                        |

**There is no admin delete route for tracks.** Moderation widens the business
route instead: `DELETE /api/tracks/delete` accepts the owner **or** a holder of
`track:moderate`. A second deletion path would eventually forget one of the steps
the real one performs (the row, the `.wav`, the `.peaks`). Same reasoning behind
the 400/409 guards above: an install must not be able to lock itself out of its
own back-office. See [permissions.md](./permissions.md).

### `/api/chat`

All five routes require `chat:access`, which a `GUEST` does not hold. See
[chat.md](./chat.md).

## Conventions that apply everywhere

- **Validation is Fastify JSON Schema**, written as plain objects in the route
  file. No Zod. `additionalProperties: false` is the norm; multipart is the
  exception and is validated by hand in `utils/validation.ts`, because
  `req.file()` fields arrive untyped.
- **Every route declares a request schema for each input source it reads and a
  `response` schema for its success code** — including `{ 204: { type: 'null' } }`
  for the ones that answer without a body.
- **A response schema removes every property it does not declare.** That is the
  point — it is the only mechanical guarantee that a field never leaks, and the
  reason #231 (a password hash in the payload) cannot happen twice. It is also the
  trap: a forgotten field does not raise, it silently disappears. Shared response
  shapes live in `routes/schemas/` (`authUserSchema`, `producerSchema`,
  `trackSchema`, `sampleSchema`, `conversationSchema`, `projectSchema`, and
  `paginatedResponseSchema(itemSchema)`); build on those instead of retyping an
  entity. `response` covers only the codes it lists — errors keep flowing through
  the single `setErrorHandler`.
- **Dates cross the wire as ISO strings**, converted by the repositories'
  `_format()`, so they are declared `{ format: 'date-time', type: 'string' }`.
- **Handlers throw domain errors**, they never build an error body.
  `domain/errors.ts` holds the classes and one `setErrorHandler` in `app.ts` maps
  each to a status. A new error class without a branch there silently becomes a 500.
- **Authorization is a second preHandler**, never an `if` in the handler:
  `preHandler: [app.authenticate, app.authorize(Permissions.USER_READ)]`. It
  answers **403, never 401** — a 401 logs the whole frontend out. The exception is
  a rule a flat permission cannot express, _owner **or** moderator_, where the
  controller calls `can()` itself (`DELETE /api/tracks/delete`).
  [permissions.md](./permissions.md) has the matrix.
- **Identity always comes from `req.authUser`**, never from the body or the URL,
  even when the client also sends it. Where a client does send an id (chat's
  `authorId`), the server verifies it matches the session.
- **Ownership is checked against `Owner`, not `User`.** Resolve
  `const { ownerId } = await userRepository.findById(req.authUser.id)` first, then
  compare `resource.ownerId`.
- **Rate limiting is opt-in** (`global: false`): only routes with
  `config: { rateLimit: … }` are throttled.
- **List endpoints share one pagination contract** — `page` / `limit` / `q` parsed
  by `utils/pagination.ts`, response `{ items, total, page, limit }`, and omitting
  both paging params returns the full list. Which endpoints are covered, and what
  `q` matches on each: [../pagination.md](../pagination.md).
