# Monorepo

A single pnpm-workspace repo holding all apps and shared packages. Each project
keeps its own folder, `package.json`, and config; they share Git history and can
depend on each other locally.

## Structure

```
transcendence/
  apps/
    back/            backend server (Fastify + Prisma)
    front/           main frontend (landing, auth, dashboard, social)
    studio/          DAW studio app (openDAW SDK)
  packages/
    auth/            shared React auth (context + API client)
    date/            shared date helpers (dayjs, fixed Europe/Paris timezone)
    eslint-config/   shared ESLint configuration
    prettier-config/ shared Prettier configuration
    ui/              shared UI components
  design/            UI mockups & design reference (READ-ONLY, not shipped)
  docs/              documentation
  infra/             nginx configs, postgres init, TLS certs, audio data
  scripts/           helper scripts
  docker-compose.yaml + docker-compose.override.yaml
  pnpm-workspace.yaml
```

### Apps

| App      | Name                    | Description                                  |
| -------- | ----------------------- | -------------------------------------------- |
| `back`   | `@transcendence/back`   | Backend server (Fastify, Prisma, PostgreSQL) |
| `front`  | `@transcendence/front`  | Main frontend (React 19, Vite, Ant Design)   |
| `studio` | `@transcendence/studio` | DAW studio (React 19 + openDAW SDK)          |

### Packages

| Package           | Name                             | Used by                   | Description                                      |
| ----------------- | -------------------------------- | ------------------------- | ------------------------------------------------ |
| `auth`            | `@transcendence/auth`            | `front`, `studio`         | React auth context + API client                  |
| `date`            | `@transcendence/date`            | `back`, `front`, `studio` | dayjs helpers on a fixed `Europe/Paris` timezone |
| `eslint-config`   | `@transcendence/eslint-config`   | all apps                  | Shared ESLint rules                              |
| `prettier-config` | `@transcendence/prettier-config` | all apps                  | Shared Prettier config                           |
| `ui`              | `@transcendence/ui`              | `front`, `studio`         | Shared UI components (antd + `Msn*` + `theme`)   |

All packages are scoped `@transcendence/`.

`date` is the only shared package consumed by the **backend** as well as the
frontends, which is why it ships a `dist` build (esbuild) alongside its sources:
the Vite apps compile the TypeScript themselves, the bundled Node backend cannot.
It exports `toAppTime`, `formatDate`, `formatISO` and `APP_TIMEZONE`. Pinning one
timezone in one place is what keeps a timestamp rendered identically by the API
and by both frontends — `repositories/*` call `formatISO` when mapping rows out.

## Referencing packages

Apps depend on local packages with the `workspace:*` protocol, e.g. in
`apps/front/package.json`:

```json
{
  "dependencies": {
    "@transcendence/auth": "workspace:*",
    "@transcendence/ui": "workspace:*"
  }
}
```

pnpm links the local version — changes are picked up without publishing.

## Workspace config

`pnpm-workspace.yaml` lists the package globs (`apps/*`, `packages/*`) and an
`allowBuilds` block that allow-lists which dependencies may run install-time
build scripts (pnpm blocks them by default).

## Key commands

Run from the repo root; `--filter` targets one package by its `name`.

| Command                                        | What it does                     |
| ---------------------------------------------- | -------------------------------- |
| `pnpm install`                                 | Install all deps                 |
| `pnpm --filter @transcendence/studio dev`      | Run `dev` in one app             |
| `pnpm --filter @transcendence/back db:migrate` | Run any script in one app        |
| `pnpm run check` / `pnpm run fix`              | Prettier + ESLint (report / fix) |
| `pnpm services:up` / `services:down`           | Start / stop infra containers    |
| `pnpm prod`                                    | Build and start the full stack   |
