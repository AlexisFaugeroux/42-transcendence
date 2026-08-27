# MakeSomeNoise

A collaborative music production platform — built as a 42 school project (ft_transcendence).

Users can produce music in a browser-based DAW, export their projects as
tracks, manage sessions and samples, follow other producers, see who is online,
and chat by direct message. The platform is planned around three creative tools:
a **studio** (DAW — implemented), a **recorder** (live sessions, podcasts) and a
**mixer** (mixing/mastering); only the studio exists today.

## Monorepo layout

pnpm workspace. All commands run from the root.

```
transcendence/
  apps/
    studio/       Web DAW — built on the openDAW SDK (React 19, Vite, SASS)
    front/        Main frontend — landing, auth, settings, sessions, samples, tracks, producers, messages
    back/         Backend server (Fastify + Prisma + PostgreSQL)
  packages/
    auth/            Shared React auth (context + API client)
    date/            Shared date helpers (dayjs, fixed Europe/Paris timezone)
    eslint-config/   Shared ESLint rules (base + React configs)
    i18n/            Shared i18n provider & translations (fr / en / es)
    prettier-config/ Shared Prettier rules
    ui/              Shared UI components (@transcendence/ui)
  design/         UI mockups & design system reference (READ-ONLY, not shipped)
  docs/           Architecture docs, tooling guides
  infra/          nginx configs, postgres init, TLS certs, media data
```

Packages reference each other with `workspace:*` and are scoped `@transcendence/*`.

## Stack

| Layer         | Tech                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Frontend      | React 19 + TypeScript, Vite, SASS modules                                                         |
| Audio engine  | `@opendaw/*` SDK packages ([openDAW-headless](https://github.com/andremichelle/openDAW-headless)) |
| Backend       | Node.js (Fastify) + Prisma                                                                        |
| Database      | PostgreSQL 18 (Alpine) in Docker                                                                  |
| Real-time     | WebSockets (`@fastify/websocket`) — presence and chat delivery                                    |
| Hosting       | Docker Compose (nginx reverse proxy + Node.js, audio files on disk)                               |
| Audio storage | On-disk volume, served by nginx with `auth_request` access control                                |

## Key commands

| Command                                   | What it does                    |
| ----------------------------------------- | ------------------------------- |
| `pnpm install`                            | Install all dependencies        |
| `pnpm --filter @transcendence/studio dev` | Dev server for the studio app   |
| `pnpm --filter @transcendence/front dev`  | Dev server for the frontend     |
| `pnpm --filter @transcendence/back dev`   | Dev server for the backend      |
| `pnpm run check`                          | Prettier + ESLint (report only) |
| `pnpm run fix`                            | Prettier + ESLint (auto-fix)    |

## Code conventions

- **Formatting:** Prettier — single quotes, semicolons, 2-space indent, 100 char width, trailing commas.
  Config lives in `packages/prettier-config/prettierrc.js`. Apps reference it via `"prettier": "@transcendence/prettier-config"` in package.json.
- **Linting:** ESLint flat config. `createBaseConfig()` for all apps, `createReactConfig()` added for React apps.
  Config lives in `packages/eslint-config/eslint.config.js`.
- **Styling:** SASS modules. The design system is in `design/` — translate its tokens into SASS, don't import the design files directly.
- **Package scope:** all workspace packages are `@transcendence/*`.

## Design system

The `design/` folder contains mockups and a design system extracted from openDAW.
It is a **visual reference only** — not code to ship.

Key references:

- `design/README.md` — full design handoff (colors, type, spacing, components)
- `design/colors_and_type.css` — CSS variables and base styles
- `design/ui_kits/studio/` — high-fidelity DAW UI recreation
- `design/assets/` — logo, icon sprite

Design language: near-black panels, saturated accent hues as functional state
colors, dense UI, Rubik font, minimal animation. See `design/README.md` for details.

Pages mocked up: landing, login, signup, home (dashboard), sessions list,
samples library, studio workspace.

## Architecture notes

- **Database:** PostgreSQL 18 (Alpine image) in a Docker container. Relational data only —
  audio files stay on disk. See `docs/architecture/database.md`.
- **Media storage:** on-disk volume mounted at `/var/www/media/`, one subdirectory
  per kind of uploaded file (`samples/`, `tracks/`, `avatars/`). Served by the
  `nginx-media` container — `/samples/` and `/tracks/` with `auth_request` to the
  backend for access control, `/avatars/` without. Each `.wav` has a `.peaks`
  sidecar (precomputed waveform envelope) written next to it. See
  `docs/architecture/audio-file-storage.md` and `docs/peaks.md`.
- **Infrastructure:** Docker Compose (dev override + prod profile). See `docs/infra.md`.
- **API shape:** RPC-style paths (`/get`, `/upload`, `/update?id=`) everywhere except
  `/api/users/:handle/*`. Eight prefixes, mapped in `docs/architecture/api.md`.
- **Real-time:** a single WebSocket endpoint (`/api/ws`, `@fastify/websocket`),
  authenticated by the same session cookie as the REST API. Carries presence
  (which followed producers are online) and chat delivery, with a `{ event, data }`
  envelope. Connection state is held in memory in one process; collaborative DAW
  editing is not implemented.
  See `docs/architecture/realtime.md`.

## Working with me on this project

- This is a student project. When something is non-obvious, explain the _why_,
  not just the _what_.
- Push back when I'm overcomplicating something.
- Do not edit, instead show the changes so they can be manually implemented
- Check `docs/` for architecture decisions before proposing infrastructure changes.
- Each app has its own `CLAUDE.md` with app-specific context — read it when
  working in that app. `apps/{back,front,studio}` also have a matching skill with
  the detailed conventions; the `CLAUDE.md` is the orientation, the skill is the
  reference.
