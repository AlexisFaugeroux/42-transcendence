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

| Piece                    | File                                            | Role                                                        |
| ------------------------ | ----------------------------------------------- | ----------------------------------------------------------- |
| password util            | `src/utils/password.ts`                         | hash / verify (`node:crypto` scrypt)                        |
| JWT sign/verify          | `src/plugins/auth.ts`                           | `@fastify/jwt`; `signAuthToken` decorator + `jwtVerify`     |
| `SessionRepository`      | `src/repositories/session.ts`                   | create / find-valid / revoke sessions                       |
| `authenticate` hook      | `src/plugins/auth.ts`                           | cookie → verify JWT → check session → attach `req.authUser` |
| auth controller / routes | `src/controllers/auth.ts`, `src/routes/auth.ts` | handlers under the `/api/auth` prefix                       |

`authenticate` runs as a `preHandler` on protected routes and attaches
`req.authUser = { id, sid }` (typed in `src/types/fastify.d.ts`), else 401. It is
also what guards the WebSocket route (`GET /api/ws`), so a socket cannot open
without a valid session — the same cookie, the same check, no second auth
mechanism.

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
                          hash → create Owner(USER) + User(ARTIST) → 201 { user }
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

Rate limiting is opt-in per route (`@fastify/rate-limit`, `global: false`).

## Frontend

`@transcendence/auth` (`packages/auth`) provides the shared React auth context +
API client used by `front` and `studio`.

## Out of scope (for now)

42 OAuth, 2FA, refresh-token rotation (the `Session` table already supports it).

WebSocket auth is **not** out of scope any more: `/api/ws` reuses the
`authenticate` preHandler, so the socket is authenticated by the session cookie
like any REST call. See [architecture/realtime.md](./architecture/realtime.md).
