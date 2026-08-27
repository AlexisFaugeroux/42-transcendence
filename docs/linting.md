# Linting

## What is linting?

**Linting** is the process of automatically analyzing your code to find problems
before you even run it. A **linter** reads your source files and reports things
like:

- Syntax errors (typos, missing brackets, etc.)
- Unused variables
- Potentially dangerous patterns (e.g. using `==` instead of `===`)
- Style inconsistencies (e.g. missing semicolons, wrong indentation)

Think of it like a spell-checker, but for code. It catches mistakes early so you
don't discover them at runtime or during code review.

### Linting vs. formatting

These two concepts are often confused:

- **Linting** (ESLint) checks for **code quality** issues -- things that could
  be bugs or bad practices.
- **Formatting** (Prettier) checks for **code style** -- things like indentation,
  quotes, line length. It does not care about whether your code is correct, only
  that it looks consistent.

In our project we use **both together**: Prettier handles formatting, ESLint
handles everything else. They are configured to not conflict with each other.

## Our setup

### ESLint

**ESLint 10.4.0**, pinned once for the whole workspace through the pnpm
**catalog**: `pnpm-workspace.yaml` declares `catalog: { eslint: 10.4.0 }` and
every `package.json` asks for `"eslint": "catalog:"`. One line to bump, and no
way for two packages to end up on two different majors — which matters here
because the shared config and the apps that consume it must agree.

Our ESLint configuration lives in
`packages/eslint-config/eslint.config.js`. It exports two functions:

| Function              | Used by           | What it does                                                      |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| `createBaseConfig()`  | All apps          | TypeScript rules, import sorting, promise handling, regexp checks |
| `createReactConfig()` | `front`, `studio` | React-specific rules (hooks, JSX, refresh)                        |

Each app has its own `eslint.config.js` that imports from the shared package.
For example, `apps/back/eslint.config.js` only uses the base config:

```js
import { createBaseConfig } from "@transcendence/eslint-config";

export default createBaseConfig({
  ignores: ["dist/", "build/"],
  tsconfigRootDir: import.meta.dirname,
});
```

While `apps/front/eslint.config.js` adds the React layer on top:

```js
import {
  createBaseConfig,
  createReactConfig,
} from "@transcendence/eslint-config";

export default [
  ...createBaseConfig({
    ignores: ["dist/", "build/"],
    tsconfigRootDir: import.meta.dirname,
  }),
  ...createReactConfig(),
];
```

This way, all apps share the same base rules, but only the frontend apps get
the React-specific ones.

### Sorting rules: what is enforced, and what is not

The base config pulls in `eslint-plugin-sort`, but most of it is deliberately
neutered — worth knowing before you spend time alphabetizing anything by hand:

| Rule                                         | Severity                            |
| -------------------------------------------- | ----------------------------------- |
| `sort/object-properties`                     | `off`                               |
| `sort/destructuring-properties`              | `off`                               |
| `sort/imports`, `sort/exports`               | `warn` **only** if `ESLINT_SORT=on` |
| `sort/import-members`, `sort/export-members` | `warn` **only** if `ESLINT_SORT=on` |

**Object keys no longer have to be alphabetical.** The rule was dropped in
`bba8331`: sorting object properties fights the code more often than it helps —
a props object or a config literal usually has a meaningful order, and forcing
alphabetical order makes diffs noisier, not cleaner. You will still see a lot of
alphabetized literals; that is history, not a requirement.

**Import sorting is fix-only.** The severity is read from an environment
variable:

```js
const sortImports = process.env.ESLINT_SORT === "on" ? "warn" : "off";
```

Only the `fix` scripts set it (`ESLINT_SORT=on eslint --fix .`). So your editor
never nags you about import order, but `pnpm run fix` still reorders imports.
The point is to keep a mechanical, auto-fixable concern out of the feedback loop
while still converging on one order in the committed code.

### Prettier

Our Prettier configuration lives in
`packages/prettier-config/prettierrc.js`. Here are the main settings:

| Setting         | Value   | Meaning                                        |
| --------------- | ------- | ---------------------------------------------- |
| `singleQuote`   | `true`  | Use `'hello'` instead of `"hello"`             |
| `semi`          | `true`  | Always add semicolons at the end of statements |
| `tabWidth`      | `2`     | Indent with 2 spaces                           |
| `printWidth`    | `100`   | Lines can be up to 100 characters long         |
| `trailingComma` | `'all'` | Add trailing commas everywhere possible        |

Each app references this config in its `package.json`:

```json
{
  "prettier": "@transcendence/prettier-config"
}
```

## Running linting from the terminal

From the **root** of the monorepo:

| Command                                         | What it does                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| `pnpm run check`                                | Runs Prettier and ESLint across the project (reports errors but does not fix them) |
| `pnpm run fix`                                  | Runs Prettier and ESLint and **auto-fixes** what it can                            |
| `pnpm --filter @transcendence/studio run check` | Runs checks only in the `studio` app                                               |

Always run `check` or `fix` **before pushing** your code. This avoids breaking
the build for everyone else.

## Setting up ESLint in VS Code

### 1. Install the extension

Open VS Code and install the **ESLint** extension:

1. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open the Extensions panel.
2. Search for **ESLint** (publisher: Microsoft).
3. Click **Install**.

### 2. Enable flat config support

Our project uses ESLint's **flat config** format (the `eslint.config.js` files).
This is the modern format and should be detected automatically. If you see
errors about config not being found, make sure your ESLint extension is up to
date.

### 3. Recommended VS Code settings

Add the following to your VS Code settings. You can open them with
`Ctrl+Shift+P` (or `Cmd+Shift+P`) > **Preferences: Open Settings (JSON)**:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": ["apps/back", "apps/front", "apps/studio"]
}
```

What each setting does:

- **`formatOnSave`** -- Prettier auto-formats your file every time you save.
- **`defaultFormatter`** -- Tells VS Code to use the Prettier extension for
  formatting (install it too: search "Prettier - Code formatter" in
  Extensions).
- **`codeActionsOnSave`** -- ESLint auto-fixes lint errors every time you save.
- **`eslint.workingDirectories`** -- Tells the ESLint extension where each app
  lives, so it can find the right `eslint.config.js` and `tsconfig.json` for
  each one. Without this, ESLint may not work properly in a monorepo.

### 4. Verify it works

1. Open any `.ts` or `.tsx` file in one of the apps.
2. Introduce a deliberate error, for example an unused variable:
   `const unused = 42;`
3. You should see a yellow or red underline under `unused` with a message from
   ESLint.
4. Save the file -- the error should be auto-fixed (the line gets removed or
   prefixed with `_`).

If nothing happens, check the ESLint output panel (`Ctrl+Shift+U` /
`Cmd+Shift+U` > select **ESLint** in the dropdown) for error messages.
