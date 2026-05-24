# MakeSomeNoise

A collaborative music production platform — built as a 42 school project (ft_transcendence).

Users can produce music in a browser-based DAW, manage sessions and samples,
follow other producers, watch them work in real time, and chat. The platform
has three creative tools: a **studio** (DAW), a **recorder** (live sessions,
podcasts), and a **mixer** (mixing/mastering).

## Monorepo layout

pnpm workspace. All commands run from the root.

```
transcendence/
  apps/
    studio/       Web DAW — built on the openDAW SDK (React 19, Vite, SASS)
    front/        Main frontend — landing, auth, dashboard, social, sessions, samples
    back/         Backend server (Node.js)
  packages/
    eslint-config/   Shared ESLint rules (base + React configs)
    prettier-config/ Shared Prettier rules
    ui/              Shared UI components (@transcendence/ui)
  design/         UI mockups & design system reference (READ-ONLY, not shipped)
  docs/           Architecture docs, tooling guides
```

Packages reference each other with `workspace:*` and are scoped `@transcendence/*`.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 + TypeScript, Vite, SASS modules |
| Audio engine | `@opendaw/*` SDK packages ([openDAW-headless](https://github.com/andremichelle/openDAW-headless)) |
| Backend | Node.js |
| Database / Auth | Supabase (Postgres + RLS + Supabase Auth) |
| Real-time sync | WebSockets + Yjs (collaborative editing in the studio) |
| Hosting | Infomaniak VPS (nginx + Node.js, audio files on disk) |
| Audio storage | VPS disk, served by nginx with `auth_request` access control |

## Key commands

| Command | What it does |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm --filter @transcendence/studio dev` | Dev server for the studio app |
| `pnpm --filter @transcendence/front dev` | Dev server for the frontend |
| `pnpm --filter @transcendence/back dev` | Dev server for the backend |
| `pnpm run check` | Prettier + ESLint (report only) |
| `pnpm run fix` | Prettier + ESLint (auto-fix) |

## Code conventions

- **Formatting:** Prettier — single quotes, semicolons, 2-space indent, 120 char width, trailing commas.
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

- **Database:** Supabase (free tier). Relational data only — audio files stay on disk.
  See `docs/architecture/database.md`.
- **Audio storage:** VPS disk at `/var/www/audio/`. Uploads go through the backend,
  served by nginx with `auth_request` to the backend for per-user access control.
  See `docs/architecture/audio-file-storage.md`.
- **Real-time collaboration:** Yjs documents synced over WebSockets. Used for the
  studio (collaborative DAW editing) and potentially chat.

## Working with me on this project

- This is a student project. When something is non-obvious, explain the *why*,
  not just the *what*.
- Prefer small, verifiable steps. Get the minimal version working first, then refine.
- Push back when I'm overcomplicating something.
- Check `docs/` for architecture decisions before proposing infrastructure changes.
- Each app may have its own `CLAUDE.md` with app-specific context — read it when
  working in that app.
