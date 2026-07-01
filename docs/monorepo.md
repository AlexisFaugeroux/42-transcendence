# Monorepo

## What is a monorepo?

A **monorepo** (short for "monolithic repository") is a single Git repository that contains multiple projects. Instead of having one repo per project (for example, one repo for the frontend and another for the backend), everything lives together in one place.

This does **not** mean the code is all mixed together. Each project still has its own folder, its own dependencies, and its own configuration. The difference is that they all share the same Git history, and they can easily reference each other.

### Why use a monorepo?

- **Shared code**: if the frontend and backend need the same types, utilities, or UI components, you write them once in a shared package and import them from both apps.
- **Consistent tooling**: linting rules, formatting config, and other settings are defined once and reused everywhere. No more "it works on my app but not on yours".
- **Atomic changes**: when a change spans multiple projects (for example, updating an API endpoint in the backend and the corresponding fetch call in the frontend), you can do it in a single commit and a single pull request.
- **Simpler onboarding**: one `git clone`, one `pnpm install`, and you have everything.

## How our monorepo is structured

Here is what the root of the project looks like:

```
transcendence/
  apps/
    back/           --> the backend application
    front/          --> the frontend application
    studio/         --> the DAW studio application
  packages/
    eslint-config/  --> shared ESLint configuration
    prettier-config/ --> shared Prettier configuration
    ui/             --> shared UI components
  docs/             --> documentation (you are here)
  package.json      --> root package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
```

There are two important top-level folders:

### `apps/`

This is where the **applications** live -- the things that actually run. Each subfolder is a standalone app with its own `package.json`.

| App      | Description         |
| -------- | ------------------- |
| `back`   | The backend server  |
| `front`  | The frontend client |
| `studio` | The DAW studio      |

### `packages/`

This is where the **shared packages** live -- reusable pieces of code that apps (or other packages) can depend on. They are not meant to run on their own.

| Package           | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| `eslint-config`   | A shared set of ESLint rules so all apps lint code the same way               |
| `prettier-config` | A shared Prettier config so all apps format code the same way                 |
| `ui`              | Shared UI components that can be used by `front`, `studio`, or any future app |

## How packages reference each other

When an app needs a shared package, it declares it as a dependency in its `package.json` using the `workspace:*` protocol. For example, in `apps/front/package.json`:

```json
{
  "dependencies": {
    "@transcendence/ui": "workspace:*"
  },
  "devDependencies": {
    "@transcendence/eslint-config": "workspace:*",
    "@transcendence/prettier-config": "workspace:*"
  }
}
```

`workspace:*` tells pnpm: "don't download this from the internet, use the local version from our monorepo". This means changes you make to `packages/ui` are **immediately** available in `apps/front` without publishing anything.

All packages in this monorepo are scoped under `@transcendence/`. This is just a naming convention to avoid conflicts with packages on npm.

## pnpm and the workspace

We use **pnpm** as our package manager (not npm, not yarn). pnpm is fast, disk-efficient, and has first-class support for monorepos through its **workspace** feature.

The file `pnpm-workspace.yaml` at the root tells pnpm where to find the packages:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

This means every folder inside `apps/` and `packages/` that has a `package.json` is treated as a workspace package.

### Key commands

All commands should be run **from the root** of the monorepo.

| Command                                   | What it does                                               |
| ----------------------------------------- | ---------------------------------------------------------- |
| `pnpm install`                            | Install dependencies for **all** apps and packages at once |
| `pnpm --filter @transcendence/studio dev` | Run the `dev` script only in the `studio` app              |
| `pnpm --filter @transcendence/back test`  | Run the `test` script only in the `back` app               |
| `pnpm run check`                          | Run the root-level `check` script (prettier + eslint)      |
| `pnpm run fix`                            | Auto-fix formatting and lint issues                        |

The `--filter` flag is how you target a specific app or package. The value after `--filter` is the `name` field from that package's `package.json`.

## Quick summary

- **One repo, multiple projects.** Apps go in `apps/`, shared code goes in `packages/`.
- **pnpm workspaces** link everything together. Use `workspace:*` to depend on local packages.
- **Run commands from the root.** Use `--filter` to target a specific app or package.
- **Shared config is centralized.** ESLint and Prettier configs live in `packages/` so every app follows the same rules.
