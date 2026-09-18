# JWT Authentication

App: `apps/back` (Fastify 5 + Prisma 7 + PostgreSQL)

Login hands the browser a signed **JWT** in an `httpOnly` cookie. The JWT also
carries a **session id** (`sid`) pointing at a `Session` row, which gives us
revocation (a plain JWT can't be revoked). Every protected request:

1. verifies the JWT signature (HS256, no DB), then
2. looks up the session by `sid` (one DB read) — valid only if it exists,
   `revokedAt` is null, and `expiresAt > now`.

Logout sets `revokedAt`, so the token dies even though its signature is still
valid.

## Where it lives

| Piece                    | File                                                 | Role                                                        |
| ------------------------ | ---------------------------------------------------- | ----------------------------------------------------------- |
| password util            | `src/utils/password.ts`                              | hash / verify (`node:crypto` scrypt)                        |
| JWT sign/verify          | `src/plugins/auth.ts`                                | `@fastify/jwt`; `signAuthToken` decorator + `jwtVerify`     |
| `SessionRepository`      | `src/repositories/session/session.ts`                | create / find-valid / revoke / list sessions                |
| `authenticate` hook      | `src/plugins/auth.ts`                                | cookie → verify JWT → check session → attach `req.authUser` |
| `authorize` factory      | `src/plugins/auth.ts`                                | permission check on top of `authenticate` — 403 on failure  |
| auth controller / routes | `src/controllers/auth/auth.ts`, `src/routes/auth.ts` | handlers under the `/api/auth` prefix                       |
| API key util             | `src/utils/apiKey.ts`                                | generate / hash / verify a key, and the header name         |
| `ApiKeyRepository`       | `src/repositories/apiKey/apiKey.ts`                  | create / list / resolve / revoke / record last use          |

`authenticate` runs as a `preHandler` on protected routes and attaches
`req.authUser = { id, role, sid, apiKeyId }` (typed in `src/types/fastify.d.ts`),
else 401. `authenticateSession` is the stricter variant: same check, but it also
requires `sid`, so the route is reachable by a browser session and never by an API
key. It guards the WebSocket route (`GET /api/ws`), logout, password change and
account deletion.

**The role rides along in `authUser` because the session row is already being
read.** `findValid` selects it in the same query, so authorization costs no extra
round-trip, and a role changed from the back-office takes effect on the account's
next request instead of at its next login.

## Authentication vs authorization

`authenticate` answers _are you signed in_; `app.authorize(permission)` answers
_are you allowed_. They compose as a preHandler pair, in that order:

```ts
preHandler: [app.authenticate, app.authorize(Permissions.USER_READ)];
```

`authorize` throws `ForbiddenError` → **403, and never 401**. A 401 makes the
frontend's `apiFetch` dispatch `auth:unauthorized`, which clears the user and logs
the whole app out; a missing permission is not an expired session and must not
sign anyone out. The roles, the permission matrix and the front-end mirror of it
live in [architecture/permissions.md](./architecture/permissions.md).

`register`, `login` and `me` still query Prisma directly from the controller,
which is the one place in the backend that breaks the "Prisma stops at the
repository" rule; `checkAccess` already goes through `userRepository`, and
sessions always go through `SessionRepository`. Worth folding the remaining three
into the repository when that file is next touched.

## Token & cookie

- **JWT:** HS256, secret `JWT_SECRET` (throws on boot if unset), payload
  `{ sub: userId, sid }`, `expiresIn: '7d'`.
- **Cookie** (`token`): `httpOnly`, `secure` in production only, `sameSite: lax`,
  `path: /`, `maxAge` = session TTL (7 days).

## Password hashing

`crypto.scrypt`: random 16-byte salt, 64-byte derived key, stored as
`salt:derivedKey` (hex). Verify re-derives and compares with
`crypto.timingSafeEqual` (constant-time).

## Routes (`/api/auth`)

```
POST /register   (5/min)  validate → reject if email/artistName/handle taken →
                          hash → create Owner(USER) + User(role) → 201 { user }
                          role is chosen by the visitor but the schema only
                          accepts ARTIST | GUEST, so MODERATOR and ADMIN are
                          unreachable from the public API
                          (no auto-login: no cookie set)
POST /login      (5/min)  verify password (generic 401 on failure) →
                          create Session → sign JWT → Set-Cookie → 200 { user }
GET  /me         [auth]   return current user (never the hash)
POST /logout     [auth]   revoke session → clear cookie → 204
GET  /check-access [auth]  sample **or track** ownership/visibility check →
                          200/401/403 only (called by nginx's auth_request, not
                          by the browser; any other status becomes a 500 for the
                          client — see audio-file-storage.md)
```

Account management lives under a different prefix — `PUT /api/user/update/password`,
`DELETE /api/user/delete`, avatar upload/delete — see
[architecture/api.md](./architecture/api.md).

An admin can also act on somebody else's sessions: `GET /api/admin/users/sessions`
lists the valid ones and `POST /api/admin/users/revoke` calls
`revokeAllForUser`, then `webSocketRegistry.closeAll(userId)` so the account's open
sockets drop immediately rather than lingering until its next HTTP call.

## Rate limiting

`@fastify/rate-limit`, `global: false` — only routes with `config.rateLimit` are
limited. Presets live in `apps/back/src/constants.ts` (`RATE_LIMITS`).

| Preset        | Limit      | Used for                                 |
| ------------- | ---------- | ---------------------------------------- |
| `auth`        | 5 / min    | login, register, profile/password update |
| `write`       | 40 / min   | follow, like, chat send, project save    |
| `upload`      | 10 / 5 min | sample / track / avatar upload           |
| `read`        | 60 / min   | list/get routes, WS handshake            |
| `destructive` | 10 / min   | account deletes (user + admin)           |
| `dm`          | 10 / min   | `POST /api/chat/createConversation`      |

Key = `authUser.apiKeyId` for an API key, else `authUser.id` if logged in, else `req.ip`. Needs `trustProxy: true` and
nginx `X-Forwarded-For` / `X-Real-IP` on `/api/` and `/api/ws`
(`infra/nginx/reverse-proxy.conf`).

Not limited (on purpose): `GET /me`, `POST /logout`, `GET /check-access`
(nginx `auth_request` on every media hit).

Store is **in-memory, per process** — fine with one back instance; not shared
across replicas.

## Frontend

`@transcendence/auth` (`packages/auth`) provides the shared React auth context +
API client used by `front` and `studio`. It also re-exports the permission side of
the session as `useIsAllowed()` and `usePermissions(perm)`, both reading the role
off the authenticated user — see
[architecture/permissions.md](./architecture/permissions.md).

## API keys

A second way in, for scripts and third-party services: `X-API-Key` on every
request, instead of the session cookie. Keys are managed from `/settings`
(`POST /api/keys/create`, `GET /api/keys/get`, `DELETE /api/keys/revoke?id=`) and
documented in the OpenAPI spec at `/documentation`.

**Format.** `msn_<prefix>_<secret>` — an 8-character prefix and 256 bits of
randomness, both base64url. The prefix is stored in clear and is unique; it is
what the lookup is done on. The secret never touches the database.

**Storage.** Only `sha256(key)` is stored. Unlike a password, a key is 256 bits we
generated ourselves: it cannot be guessed or dictionary-attacked, so a slow KDF
would buy nothing and cost latency on every authenticated request. Verification is
a `timingSafeEqual` on the digests. The plaintext is returned once, by the create
endpoint, and cannot be read again.

**Resolution.** The same `onRequest` hook that reads the session falls through to
the header when there is no valid JWT: parse the prefix, load the row, reject a
revoked or expired key, compare the hashes, then attach `req.authUser` exactly as a
session would — same shape, same role, same `authorize` afterwards. A key therefore
carries the permissions of its owner and **nothing more**. `lastUsedAt` is written
without blocking the request.

**What a key cannot do.** Anything guarded by `authenticateSession`: open a
WebSocket, log out, change the password, delete the account — and, deliberately,
manage API keys. A leaked key cannot mint another one or outlive its revocation.

**Rate limiting.** The limiter keys on `apiKeyId` before `authUser.id`, so two keys
of the same account get their own budget and a runaway script cannot throttle its
owner's browser session.

**Limits.** 10 active keys per account, optional expiry (30, 90 or 365 days).

## Out of scope (for now)

42 OAuth, 2FA, refresh-token rotation (the `Session` table already supports it).
API keys carry their owner's full permissions — there is no per-key scope.

WebSocket auth is **not** out of scope any more: `/api/ws` reuses the
`authenticate` preHandler, so the socket is authenticated by the session cookie
like any REST call. See [architecture/realtime.md](./architecture/realtime.md).
