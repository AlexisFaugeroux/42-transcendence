# Formatting

## What is formatting?

**Formatting** is the automatic process of making your code look consistent.
It deals with things like:

- How many spaces to use for indentation
- Whether to use single quotes (`'hello'`) or double quotes (`"hello"`)
- Where to put line breaks when a line gets too long
- Whether to add a trailing comma after the last item in a list

Formatting has **nothing to do with whether your code is correct**. It only
cares about how it looks. Two pieces of code can do the exact same thing but
look completely different depending on formatting choices.

### Why does it matter?

When multiple people work on the same codebase, everyone has their own style.
Without a formatter, pull requests end up full of noise -- tabs vs. spaces,
semicolons added here, removed there. This makes code review harder and creates
unnecessary merge conflicts.

A formatter solves this by enforcing one style automatically. You write your
code however you want, hit save, and it gets reformatted to match the team's
rules. No debates, no inconsistencies.

### Formatting vs. linting

See [linting.md](./linting.md) for a detailed comparison. The short version:

- **Prettier** (formatting) = how code **looks**
- **ESLint** (linting) = how code **behaves**

They work together in our project and are configured to not conflict with each
other.

## Our setup

We use **Prettier** as our formatter. The configuration is shared across all
apps through the `@transcendence/prettier-config` package.

### The config file

The configuration lives in `packages/prettier-config/prettierrc.js`:

```js
export default {
  arrowParens: "always",
  jsonRecursiveSort: true,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
};
```

Here is what each rule means in practice:

| Rule                | Value      | What you write      | What Prettier outputs                      |
| ------------------- | ---------- | ------------------- | ------------------------------------------ |
| `singleQuote`       | `true`     | `"hello"`           | `'hello'`                                  |
| `semi`              | `true`     | `const x = 1`       | `const x = 1;`                             |
| `tabWidth`          | `2`        | any indentation     | 2-space indentation                        |
| `printWidth`        | `120`      | a very long line    | line is split if it exceeds 120 characters |
| `trailingComma`     | `'all'`    | `[1, 2, 3]`         | `[1, 2, 3,]` (comma after `3`)             |
| `arrowParens`       | `'always'` | `x => x + 1`        | `(x) => x + 1`                             |
| `jsonRecursiveSort` | `true`     | unordered JSON keys | keys sorted alphabetically                 |

The config also includes two plugins:

- **prettier-plugin-sort-json** -- automatically sorts keys in `.json` files.
- **prettier-plugin-packagejson** -- sorts `package.json` fields in the
  conventional order (name, version, scripts, dependencies, etc.).

### How apps use it

Each app references the shared config in its `package.json`:

```json
{
  "prettier": "@transcendence/prettier-config"
}
```

That single line is all it takes. Prettier will pick up the rules from the
shared package automatically.

## Running Prettier from the terminal

From the **root** of the monorepo:

| Command          | What it does                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| `pnpm run check` | Checks formatting (and linting) -- reports issues without changing files |
| `pnpm run fix`   | Fixes formatting (and linting) -- rewrites files in place                |

Under the hood, these commands run:

- `prettier --check .` (or `prettier --write .` for fix)
- `eslint .` (or `eslint --fix .` for fix)

You can also run Prettier alone if you only want to check formatting:

```sh
# Check formatting without fixing
pnpm prettier --check .

# Fix formatting
pnpm prettier --write .
```

## Setting up Prettier in VS Code

### 1. Install the extension

1. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open the Extensions
   panel.
2. Search for **Prettier - Code formatter** (publisher: Prettier).
3. Click **Install**.

### 2. Configure VS Code

Open your settings with `Ctrl+Shift+P` (or `Cmd+Shift+P`) > **Preferences:
Open Settings (JSON)** and add:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

- **`formatOnSave`** -- every time you save a file, Prettier reformats it
  automatically.
- **`defaultFormatter`** -- tells VS Code to use Prettier (not its built-in
  formatter) for all files.

### 3. Verify it works

1. Open any file in the project (`.ts`, `.json`, `.md`, etc.).
2. Mess up the formatting on purpose -- for example, change indentation to 4
   spaces, or replace single quotes with double quotes.
3. Save the file.
4. The file should snap back to the correct formatting instantly.

If it does not work, check that:

- The Prettier extension is installed and enabled.
- You do not have another formatter extension conflicting with it.
- The bottom-right corner of VS Code shows **Prettier** as the active
  formatter for the current file (click on it to change it if needed).
