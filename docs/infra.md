# Infrastructure (dev & prod)

Orchestrated with Docker Compose from the repo root:

- `docker-compose.yaml` — base definition of every service.
- `docker-compose.override.yaml` — **dev-only** tweaks, auto-merged unless you
  pass `-f docker-compose.yaml` explicitly.

A Compose **profile** splits the two modes: `db` and `nginx-media` have no
profile (start in dev); `back`, `front`, `studio`, `reverse-proxy` are under the
`prod` profile. Shared network `transcendence_net`; volumes `db_data` and
`media_data`.

`media_data` is the **media root**, mounted at `/var/www/media`. Uploaded content
sits in one subdirectory per kind — `audio/` today, `avatars/` next — so adding a
kind needs neither a new volume nor a new nginx service. Public URLs are
unaffected by the layout: nginx roots at `/var/www/media`, so `/audio/…` still
resolves to `/var/www/media/audio/…`.

## Development

Infra runs in containers, apps run on the host with hot reload.

```sh
pnpm install
pnpm services:up                               # docker compose up -d (base + override)
pnpm --filter @transcendence/back db:migrate   # once / after schema changes
pnpm --filter @transcendence/back db:seed
pnpm --filter @transcendence/back dev          # Fastify -> http://localhost:8080
pnpm --filter @transcendence/front dev         # Vite    -> http://localhost:5173
pnpm --filter @transcendence/studio dev
```

The override publishes `db` on `localhost:5432` and `nginx-media` on
`localhost:8081`, mounts `media.dev.conf` (whose `auth_request` upstream is
`host.docker.internal:8080`, i.e. the host-run backend) and `infra/media_data`
(rw), and adds `extra_hosts: host.docker.internal:host-gateway`.

Each Vite dev server proxies the paths the reverse proxy owns in prod, so app
code can use relative URLs in both environments and never has to know a host:

| Path     | front (`:5173`)                | studio (`:5174`)               |
| -------- | ------------------------------ | ------------------------------ |
| `/api`   | → `localhost:8080` back        | → `localhost:8080` back        |
| `/audio` | → `localhost:8081` nginx-media | → `localhost:8081` nginx-media |

Both apps fetch from `/audio/`: the studio loads samples into the DAW, the front
previews them and fetches their `.peaks` in the samples library. Going through
the proxy rather than hitting `localhost:8081` directly keeps the requests
same-origin, so the session cookie travels and nginx's `auth_request` is
satisfied — a direct call would be cross-origin and blocked by the CORS headers
in `media.dev.conf`.

Teardown: `pnpm services:down` (keep data) or `pnpm services:kill` (remove
volumes/orphans — wipes data).

## Production

```sh
pnpm prod
# sh scripts/gen-certs.sh && docker compose -f docker-compose.yaml --profile prod up -d --build
```

`-f docker-compose.yaml` excludes the dev override, so only the reverse proxy
publishes ports. `gen-certs.sh` writes a self-signed cert to `infra/nginx/certs/`
(skipped if present).

```
browser ──► reverse-proxy (nginx, TLS)
              / ───────► front       (nginx:80)
              /studio/ ─► studio      (nginx:80)
              /api/ ────► back        (:8080)
              /audio/ ──► nginx-media (nginx:80) ─auth_request─► back
            back ──► db (postgres:5432)
```

| Service         | Image / build            | Role                                                                                                                  |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `reverse-proxy` | `nginx:1.30.3-alpine`    | Only public entry point. Ports `8080:80` (redirect) + `8443:443` (HTTPS). TLS terminated here (`reverse-proxy.conf`). |
| `front`         | `apps/front/Dockerfile`  | Static Vite build served by nginx (`nginx-spa.conf`, SPA fallback).                                                   |
| `studio`        | `apps/studio/Dockerfile` | Static Vite build served by nginx.                                                                                    |
| `back`          | `apps/back/Dockerfile`   | Fastify on `:8080`. `env_file: .env.prod`. Mounts `media_data` (rw).                                                  |
| `nginx-media`   | `nginx:1.30.3-alpine`    | Serves `/audio/` from `media_data` (ro) with `auth_request` (`media.conf`).                                           |
| `db`            | `postgres:18-alpine`     | PostgreSQL, reached at host `db` on the network (not published).                                                      |

Reach the app at **https://localhost:8443** (self-signed — accept the warning);
`http://localhost:8080` redirects to HTTPS. Only the reverse proxy is exposed;
everything else talks over the internal network.

### Backend container startup

`apps/back/docker-entrypoint.sh`: `prisma migrate deploy` → unzip
`samples/*.zip` → `node build/seedDb.prod.js` → start Fastify. The image is
multi-stage (Node 26 Alpine, pnpm 11.1.3): install → generate Prisma client →
esbuild → `pnpm deploy --prod`.

## Quick reference

| Command                              | What it does                     |
| ------------------------------------ | -------------------------------- |
| `pnpm services:up` / `services:down` | Start / stop infra containers    |
| `pnpm services:logs`                 | Follow container logs            |
| `pnpm services:kill`                 | Stop + remove volumes/orphans    |
| `pnpm prod`                          | Certs + build + start full stack |
