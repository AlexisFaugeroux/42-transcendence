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

`authenticate` runs as a `preHandler` on protected routes and attaches
`req.authUser = { id, role, sid }` (typed in `src/types/fastify.d.ts`), else 401.
It is also what guards the WebSocket route (`GET /api/ws`), so a socket cannot open
without a valid session — the same cookie, the same check, no second auth
mechanism.

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
| `write`       | 30 / min   | follow, like, chat send, project save    |
| `upload`      | 10 / 5 min | sample / track / avatar upload           |
| `read`        | 60 / min   | list/get routes, WS handshake            |
| `destructive` | 3 / min    | account deletes (user + admin)           |
| `dm`          | 10 / min   | `POST /api/chat/createConversation`      |

Key = `authUser.id` if logged in, else `req.ip`. Needs `trustProxy: true` and
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

## Out of scope (for now)

42 OAuth, 2FA, refresh-token rotation (the `Session` table already supports it).

WebSocket auth is **not** out of scope any more: `/api/ws` reuses the
`authenticate` preHandler, so the socket is authenticated by the session cookie
like any REST call. See [architecture/realtime.md](./architecture/realtime.md).
