# Back (API server)

Fastify 5 + Prisma 7 + PostgreSQL 18, ESM, TypeScript.

> **Read the `back` skill before writing code here.** It carries the details that are easy to get
> wrong — the layer boundaries, the RPC path style, the JSON Schema approach, the `Owner` vs `User`
> authorization rule. This file is only the orientation.

## Layers

```
routes/        path, JSON Schema validation, auth preHandler
controllers/   orchestration: read req, call repos/services, set status code
services/      non-DB work — audio/{audioStorage,sampleStorage,trackStorage},
               avatarStorage, imageService, wav (WAV decoding), msnp (peaks)
repositories/  the only layer that touches Prisma
domain/        hand-written types + error classes
utils/         prisma client, password, bytes, multipart validation, pagination,
               websockets (the socket registry)
plugins/       Fastify plugins (auth: cookie + jwt + rate-limit + `authenticate` /
               `authorize` decorators)
```

**Prisma stops at the repository.** Controllers receive domain types, never `PrismaSample`.
Repositories convert via a private `_format()` and map Prisma error codes to domain errors, so a
P2002 surfaces as `ConflictError` and the HTTP layer never learns Prisma codes exist. The one place
still breaking this is `controllers/auth/auth.ts` (register / login / me).

The `sample` slice is the reference implementation — mirror it.

## Route prefixes

Registered in `src/app.ts`: `/api/ws`, `/api/auth`, `/api/user` (yourself), `/api/users` (other
producers), `/api/samples`, `/api/tracks`, `/api/project`, `/api/chat`, `/api/admin` (back-office),
`/api/keys` (API keys). Plus `/documentation`, the Swagger UI, outside `/api` because it is not part
of the API surface. Full map in `docs/architecture/api.md`.

`/api/user` and `/api/users` are two different route files. Check which one you are in.

## Commands

```sh
pnpm --filter @transcendence/back dev          # tsx watch, :8080
pnpm --filter @transcendence/back db:migrate   # prisma migrate dev
pnpm --filter @transcendence/back db:seed      # dev fixtures
pnpm --filter @transcendence/back db:reset     # drop + migrate + seed
pnpm --filter @transcendence/back db:studio
pnpm --filter @transcendence/back openapi       # write openapi.json without starting a server
pnpm --filter @transcendence/back build        # esbuild bundle -> build/index.js
```

The Prisma client is generated to `src/generated/prisma/` and **committed**. Import model types from
`../generated/prisma/client` and enums from `../generated/prisma/enums` — never from
`@prisma/client`.

Requires `POSTGRES_URL`, `JWT_SECRET` and `MEDIA_ROOT` in `.env` (dev `MEDIA_ROOT` is
`../../infra/media_data`, relative to this app — see `docs/architecture/audio-file-storage.md`).

## Also relevant

- `docs/architecture/database.md` — schema, the two databases, migrations
- `docs/pagination.md` — `parsePagination` / `toPaginatedResponse` and the covered endpoints
- `docs/architecture/audio-file-storage.md` — media on disk, nginx `auth_request`
- `docs/architecture/realtime.md` — the WebSocket registry and heartbeat
- `docs/architecture/chat.md` — the DM data model and its known issues
- `docs/authentication.md` — JWT + session, revocation
- `docs/architecture/permissions.md` — roles, the permission matrix, `app.authorize`
- `docs/wav.md` · `docs/peaks.md` — the audio formats the services parse and write
