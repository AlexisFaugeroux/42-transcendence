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
    i18n/            shared i18n provider & translations (en / fr / es)
    permissions/     shared roles & permissions (Role, Permissions, can())
    prettier-config/ shared Prettier configuration
    ui/              shared UI components
  design/            UI mockups & design reference (READ-ONLY, not shipped)
  docs/              documentation
  infra/             nginx configs, postgres init, TLS certs, media data
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
| `i18n`            | `@transcendence/i18n`            | `front`, `studio`         | i18next provider, `LanguageSelect`, en/fr/es     |
| `permissions`     | `@transcendence/permissions`     | all apps                  | `Role`, `Permissions`, `can(role, perm)`         |
| `prettier-config` | `@transcendence/prettier-config` | all apps                  | Shared Prettier config                           |
| `ui`              | `@transcendence/ui`              | `front`, `studio`         | Shared UI components (antd + `Msn*` + `theme`)   |

All packages are scoped `@transcendence/`.

`date` is the only shared package consumed by the **backend** as well as the
frontends, which is why it ships a `dist` build (esbuild) alongside its sources:
the Vite apps compile the TypeScript themselves, the bundled Node backend cannot.
It exports `toAppTime`, `formatDate`, `formatISO` and `APP_TIMEZONE`. Pinning one
timezone in one place is what keeps a timestamp rendered identically by the API
and by both frontends — `repositories/*` call `formatISO` when mapping rows out.

`permissions` holds the authorization vocabulary: `Role`
(`ADMIN | ARTIST | MODERATOR | GUEST`), ten `Permissions` (`studio:access`,
`sample:write`, `track:write`, `track:moderate`, `chat:access`, `user:read`,
`user:write`, `user:delete`, `session:revoke`, `manage_accounts`) and
`can(role, perm)` over a `ROLES_PERMISSIONS` record. Both are plain `as const`
objects with a matching type alias, deliberately **not** TS enums — a `const enum` cannot be erased by the
esbuild bundle the backend ships, and a runtime object is what lets the backend map
its Prisma `Role` onto the same values. The Prisma enum and this package are kept
in sync by hand.

`can()` is what the backend's `app.authorize` preHandler, the frontend's
`usePermissions` hook and the studio's access guard all call, so a rendered button
and an allowed route come from the same record. See
[architecture/permissions.md](./architecture/permissions.md).

`i18n` wraps i18next + react-i18next and owns the three locale files
(`src/locales/{en,fr,es}.json`). It ships an `I18nProvider` and a
`LanguageSelect`, and it depends on `ui` and `date` — so it sits _above_ them in
the dependency order. Both frontends mount the provider high in their tree; see
[i18n.md](./i18n.md).

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

`pnpm-workspace.yaml` lists the package globs (`apps/*`, `packages/*`), an
`allowBuilds` block that allow-lists which dependencies may run install-time
build scripts (pnpm blocks them by default), and a `catalog:` block pinning
shared tool versions in one place — today `eslint`, which every `package.json`
asks for as `"eslint": "catalog:"`. See [linting.md](./linting.md).

## Key commands

Run from the repo root; `--filter` targets one package by its `name`.

| Command                                        | What it does                    |
| ---------------------------------------------- | ------------------------------- |
| `pnpm install`                                 | Install all deps                |
| `pnpm --filter @transcendence/studio dev`      | Run `dev` in one app            |
| `pnpm --filter @transcendence/back db:migrate` | Run any script in one app       |
| `pnpm run check` / `pnpm run fix`              | Prettier + ESLint + typecheck   |
| `pnpm run typecheck`                           | `tsc --noEmit` in every package |
| `pnpm services:up` / `services:down`           | Start / stop infra containers   |
| `pnpm prod`                                    | Build and start the full stack  |
