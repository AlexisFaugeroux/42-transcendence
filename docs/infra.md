# Infrastructure (dev & prod)

Orchestrated with Docker Compose from the repo root:

- `docker-compose.yaml` — base definition of every service.
- `docker-compose.override.yaml` — **dev-only** tweaks, auto-merged unless you
  pass `-f docker-compose.yaml` explicitly.

A Compose **profile** splits the two modes: `db` and `nginx-media` have no
profile (start in dev); `back`, `front`, `studio`, `reverse-proxy` and
`reverse-proxy-seeder` are under the `prod` profile. Shared network
`transcendence_net`; volumes `db_data`, `media_data` and `shared_certs`.

`media_data` is the **media root**, mounted at `/var/www/media`. Uploaded content
sits in one subdirectory per kind — `samples/`, `tracks/` and `avatars/` today —
so adding a kind needs neither a new volume nor a new nginx service. Public URLs
are unaffected by the layout: nginx roots at `/var/www/media`, so `/samples/…`
still resolves to `/var/www/media/samples/…`.

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

| Path       | front (`:5173`)                                | studio (`:5174`)               |
| ---------- | ---------------------------------------------- | ------------------------------ |
| `/api`     | → `localhost:8080` back                        | → `localhost:8080` back        |
| `/api/ws`  | → `ws://localhost:8080` (`ws: true`)           | —                              |
| `/samples` | → `localhost:8081` nginx-media                 | → `localhost:8081` nginx-media |
| `/tracks`  | → `localhost:8081` nginx-media (with `bypass`) | —                              |
| `/avatars` | → `localhost:8081` nginx-media                 | —                              |

Both apps fetch from `/samples/`: the studio loads samples into the DAW, the front
previews them and fetches their `.peaks` in the samples library. Going through
the proxy rather than hitting `localhost:8081` directly keeps the requests
same-origin, so the session cookie travels and nginx's `auth_request` is
satisfied — a direct call would be cross-origin and blocked by the CORS headers
in `media.dev.conf`.

Two entries in that table are not plain string targets:

- **`/api/ws`** needs `ws: true`, otherwise Vite proxies the HTTP request but not
  the protocol upgrade, and the socket never opens. It is declared _after_ `/api`
  and wins because it is more specific.
- **`/tracks`** collides with a real SPA route. `GET /tracks` from the address bar
  must render the app; `GET /tracks/<ownerId>/<uuid>.wav` must reach nginx. The
  proxy disambiguates on the `Accept` header — a `bypass()` that returns
  `/index.html` when the request accepts `text/html`
  (`apps/front/vite.config.ts`). In prod the same collision does not exist,
  because the reverse proxy matches `/tracks/` **with** a trailing slash before
  falling through to the SPA at `/`.

Teardown: `pnpm services:down` (keep data) or `pnpm services:kill` (remove
volumes/orphans — wipes data).

## Production

```sh
pnpm prod
# docker compose -f docker-compose.yaml --profile prod up -d --build
```

`-f docker-compose.yaml` excludes the dev override, so only the reverse proxy
publishes a port. The certificate comes from `reverse-proxy-seeder`, a one-shot
`alpine` container that runs `openssl req -x509` into the `shared_certs` volume
when `cert.pem` is not already there; `reverse-proxy` mounts that same volume
read-only at `/etc/nginx/certs`. Nothing is written to `infra/nginx/certs/` any
more, and the host does not need OpenSSL installed.

```
browser ──► reverse-proxy (nginx, TLS)
              / ───────► front       (nginx:80)
              /studio/ ─► studio      (nginx:80)
              /api/ ────► back        (:8080)
              /api/ws ──► back        (:8080)   websocket upgrade
              /samples/ ► nginx-media (nginx:80) ─auth_request─► back
              /tracks/ ─► nginx-media (nginx:80) ─auth_request─► back
              /avatars/ ► nginx-media (nginx:80)   no auth_request
            back ──► db (postgres:5432)
```

| Service                | Image / build            | Role                                                                                                                                                                                                             |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reverse-proxy`        | `nginx:1.30.3-alpine`    | Only public entry point. Port `8443:443` (HTTPS), TLS terminated here (`reverse-proxy.conf`). The `listen 80` → 301 block is still in the config but is no longer published, so it is unreachable from the host. |
| `reverse-proxy-seeder` | `alpine:latest`          | One-shot: writes a self-signed cert into `shared_certs` if absent, then exits.                                                                                                                                   |
| `front`                | `apps/front/Dockerfile`  | Static Vite build served by nginx (`nginx-spa.conf`, SPA fallback).                                                                                                                                              |
| `studio`               | `apps/studio/Dockerfile` | Static Vite build served by nginx.                                                                                                                                                                               |
| `back`                 | `apps/back/Dockerfile`   | Fastify on `:8080`. `env_file: .env.prod`. Mounts `media_data` (rw).                                                                                                                                             |
| `nginx-media`          | `nginx:1.30.3-alpine`    | Serves `/samples/` and `/tracks/` from `media_data` (ro) with `auth_request`, and `/avatars/` without (`media.conf`).                                                                                            |
| `db`                   | `postgres:18-alpine`     | PostgreSQL, reached at host `db` on the network (not published).                                                                                                                                                 |

Reach the app at **https://localhost:8443** (self-signed — accept the warning).
Only the reverse proxy is exposed; everything else talks over the internal
network.

### Backend container startup

`apps/back/docker-entrypoint.sh`: `prisma migrate deploy` → unzip
`samples/platform*.zip`, `samples/alex`, `samples/julien`, `avatars/avatars.zip`
and `tracks/*.zip` → `node build/seedDb.prod.js` → start Fastify. The image is
multi-stage (`node:24-alpine`, pnpm 11.1.3): install → generate Prisma client →
esbuild → `pnpm deploy --prod`.

## Quick reference

| Command                              | What it does                     |
| ------------------------------------ | -------------------------------- |
| `pnpm services:up` / `services:down` | Start / stop infra containers    |
| `pnpm services:logs`                 | Follow container logs            |
| `pnpm services:kill`                 | Stop + remove volumes/orphans    |
| `pnpm prod`                          | Certs + build + start full stack |
