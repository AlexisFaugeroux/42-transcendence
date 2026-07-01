# JWT Authentication — How It Works in Our App

Status: approved (design)
Last updated: 2026-06-18
App: `apps/back` (Fastify 5 + Prisma 7 + PostgreSQL)

This doc explains how a user logs in and stays logged in on MakeSomeNoise. It
assumes you've never set up token-based auth before, so it starts with the
concepts and then shows exactly how we wire them together.

## The problem we're solving

HTTP is **stateless**: every request the browser sends arrives with no memory of
the requests before it. The server has no built-in way to know "this is the same
person who logged in two seconds ago."

So after someone proves who they are (email + password), we need to hand the
browser a kind of **wristband** it shows on every later request. The server
checks the wristband instead of asking for the password again. That wristband is
a **JWT**, and we carry it in a **cookie**. The rest of this doc is really just:
how we make the wristband, how the browser carries it, and how we check it.

## The three concepts you need

**JWT (JSON Web Token).** A small string with three parts: a header, a payload
(some JSON data we choose), and a **signature**. We sign the payload with a
secret key only the server knows. Later, anyone can hand the token back to us and
we can verify the signature to be sure _we_ issued it and nobody tampered with
the payload. The key word is **verify, not look up**: checking a signature is
pure math, so it needs no database. That makes JWTs fast — but, as we'll see, it
also creates a problem.

**Cookie.** A small piece of data the server tells the browser to store and then
automatically attach to every future request to our domain. We put the JWT in a
cookie so the browser carries it for us, without any frontend code having to
remember it. We mark the cookie `httpOnly`, which means JavaScript on the page
**cannot read it** — so even if an attacker injects a script (an XSS attack),
they can't steal the token.

**Session.** A row in our database representing one active login. This is the fix
for the JWT problem below.

## Why we add a session table (the important part)

A plain JWT **cannot be revoked**. Because the server only verifies the
signature and never stores the token, there's no "off switch." If someone logs
out — or we want to kill a stolen token — the token stays valid until it expires
on its own. That's unacceptable: logout has to actually log you out.

Our fix: the JWT doesn't just say _who_ you are, it also carries a **session id**
(`sid`) that points at a `Session` row in Postgres. On every request we do two
cheap steps:

1. **Verify the signature** — proves we issued the token (no DB needed).
2. **Look up the session by `sid`** — proves the login is still active (one DB
   read).

To log someone out, we mark their `Session` row revoked. The next request fails
step 2 even though the token's signature is still perfectly valid. Real logout,
real revocation — at the cost of one small DB lookup per request.

That per-request lookup sounds expensive, but it fits what we already do: nginx
calls back into the backend on every audio-file request anyway (see
`docs/architecture/audio-file-storage.md`), so this is consistent with the
existing architecture rather than new overhead.

## One design choice worth naming: HS256

JWTs can be signed in different ways. We use **HS256** — one shared secret that
both signs and verifies. The alternative, RS256, uses a private key to sign and a
public key to verify, which matters when _many separate services_ need to verify
tokens they didn't issue. We have a single backend, so there's no
key-distribution problem to solve. One secret is the simpler, correct choice.

## The mental model, end to end

```
[browser]  --email + password-->  [backend]
                                     verify password
                                     create a Session row   (now there's an "off switch")
                                     sign a JWT { who you are, which session }
[browser]  <--Set-Cookie (JWT)--   [backend]

...later, on every request...

[browser]  --cookie rides along-->  [backend]
                                       verify JWT signature      (math, no DB)
                                       look up Session by sid     (1 DB read)
                                       still valid? -> you're in
```

## The pieces we build

Four small, independently testable units. The HTTP routes wire them together;
**no route talks to Prisma or the JWT library directly.** Keeping each concern in
its own unit is what makes the whole thing testable and easy to reason about.

| Unit                | What it does                                                 | Built on                     |
| ------------------- | ------------------------------------------------------------ | ---------------------------- |
| `password` util     | Hash a password; verify a password against a hash            | `node:crypto` (scrypt)       |
| `token` util        | Sign a JWT; verify a JWT                                     | `@fastify/jwt`, `JWT_SECRET` |
| `session` service   | Create, look up, and revoke session rows                     | Prisma                       |
| `authenticate` hook | Read cookie → verify JWT → check session → attach `req.user` | the three units above        |

The `authenticate` hook is the glue: it's the function every protected route runs
first. If it succeeds, the route can trust `req.user`; if not, the request is
rejected with `401`.

## Data model (Prisma)

`User.password` already exists — but from now on it stores a **hash**, never the
plaintext password (more on that below).

We add a `Session` model, plus the matching back-relation on `User`:

```prisma
model Session {
  id        String   @id @default(uuid())  // this id is the "sid" embedded in the JWT
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  expiresAt DateTime
  revokedAt DateTime?                       // null = active; a timestamp = logged out / revoked
  userAgent String?                         // handy for "this device is logged in" later
  createdAt DateTime @default(now())
}
```

```prisma
model User {
  // ...existing fields...
  sessions  Session[]
}
```

A session counts as **valid** only if all three are true: the row exists,
`revokedAt IS NULL`, and `expiresAt > now`. Anything else means "log in again."

Adding the model means a **Prisma migration is required.**

## The token and the cookie

The token:

- **Algorithm:** HS256 (the single-secret choice explained above).
- **Secret:** `JWT_SECRET`, read from the environment — add it to `.env` and
  document it in `.env.example`. If this secret leaks, anyone can forge tokens,
  so it never goes in the repo.
- **Payload:** `{ sub: <userId>, sid: <sessionId> }`. `sub` ("subject") is who
  the token is about; `sid` is which session it belongs to. We also set `exp`
  (expiry) ≈ 7 days, kept in sync with the session's `expiresAt`.

The cookie that carries the token — each attribute earns its place:

- `httpOnly` — JavaScript can't read it, so an XSS script can't steal the token.
- `Secure` — only sent over HTTPS. Enabled in production only, so local `http`
  dev still works.
- `SameSite=Lax` — the browser won't attach the cookie to most cross-site
  requests, which blunts CSRF attacks.
- `Path=/` — the cookie applies to the whole site.
- `Max-Age` — kept in line with the token's `exp` so the cookie and token expire
  together.

## Password hashing

We never store the actual password. We store a **hash** — a one-way scramble. If
the database ever leaks, attackers get hashes, not passwords.

We use Node's built-in `crypto.scrypt`. It needs zero extra dependencies, is
OWASP-acceptable, and is **memory-hard** (deliberately slow and RAM-hungry,
which makes brute-forcing it expensive).

- **Hashing:** generate a random **salt** for each password (so two users with
  the same password still get different hashes), derive the key with `scrypt`,
  and store the result as `salt:derivedKey` in hex.
- **Verifying:** re-derive the key using the stored salt, then compare with
  `crypto.timingSafeEqual`. The comparison is **constant-time** — it always takes
  the same amount of time whether the guess is close or not, so an attacker can't
  learn anything by measuring how fast we respond.

## The request flows

Each endpoint, narrated. `[auth required]` means the `authenticate` hook runs
first and must pass.

```
register:
  validate the request body → check email/pseudo aren't already taken → hash the password
  → create Owner(type USER) + User(role ARTIST) → 201
  (whether registering also logs you in is an open decision — see below)

login:
  find the user by email → verify the password (on failure, return a generic
    error so we don't reveal whether the email exists)
  → create a Session row → sign a JWT { sub, sid } → Set-Cookie → 200 { user }

authenticate (the shared hook, not an endpoint):
  read the cookie → verify the JWT signature → load the Session by sid
  → valid? attach req.user = { id, role } and continue : reject with 401

logout: [auth required]
  set Session.revokedAt = now → clear the cookie → 204
  (this is the moment the token effectively dies, even though its signature is
   still valid)

me: [auth required]
  return the current user (never the password/hash)

check-access (nginx auth_request hook): [auth required]
  authenticate, then check the user owns the requested file → 200 / 403 / 404
  (the ownership logic lives in audio-file-storage.md; this design only promises
   that the cookie is verifiable at this point)
```

## Out of scope (for now)

Deliberately left out to keep the first version small — these can come later:

- 42 OAuth login
- Two-factor auth (2FA / TOTP)
- Refresh-token rotation — though the `Session` table is already shaped to
  support it
- WebSocket / Yjs auth — it'll reuse this same logic, but isn't built here

## Open decision

Does `register` log the user in automatically (set a cookie immediately), or does
it return `201` and make them log in as a separate step? Both are reasonable;
pick one when implementing.
