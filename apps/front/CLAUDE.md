# Front (main frontend)

React 19 + TypeScript + Vite, SASS modules, antd 6 re-exported through `@transcendence/ui`, TanStack
Query v5, react-router.

Everything except the DAW. The studio is a separate app reached by URL (`VITE_STUDIO_URL`), not by
route.

> **Read the `front` skill before writing code here.** It carries the details that are easy to get
> wrong — the import rules, the two ways to reach a colour, the `apiFetch` contract, the page-folder
> anatomy, the query-key conventions. This file is only the orientation.

## Pages

Public: `/` (landing), `/login`, `/register`, `/terms`, `/privacy`, `/legal`. Behind
`<RequireAuth />`: `/home`, `/library` (samples), `/tracks`, `/sessions`, `/settings`, `/producers`,
`/producers/:handle`, `/following`, `/messages`, `/messages/:conversationId`. Catch-all `*` → 404.

## Layout

```
src/
  App.tsx        all routes + the QueryClient
  main.tsx       MsnThemeProvider > I18nProvider > AuthProvider > App
  api/           one folder per domain: <domain>/<domain>.ts + <domain>/types.ts
  auth/          RequireAuth route guard
  components/    cross-page components, one folder each
  contexts/      contexts scoped to a page subtree
  hooks/         cross-page hooks
  layout/        AppLayout, LeftNav, NavItem, ShellHeader, navItems
  lib/           framework-free helpers (peaks.ts — the MSNP decoder)
  message/       MessageListener — chat frames into the query cache
  pages/<Page>/  the page, its sub-components and their .module.scss
  presence/      PresenceProvider — who is online
  types/         shared domain types mirroring the backend
  websocket/     WebSocketProvider — the single socket
```

A page is a folder, not a file. `pages/Samples/` is the reference implementation.

## Live data

One WebSocket for the whole app (`/api/ws`), owned by `WebSocketProvider`. `PresenceProvider`
derives the online set from it, `MessageListener` turns incoming chat frames into cache updates. See
`docs/architecture/realtime.md`.

## Commands

```sh
pnpm --filter @transcendence/front dev        # Vite on :5173 (strictPort)
pnpm --filter @transcendence/front typecheck
pnpm --filter @transcendence/front build
```

The dev server proxies `/api`, `/api/ws`, `/samples`, `/tracks` and `/avatars` so app code uses
relative URLs in both dev and prod — see `docs/infra.md`, including why `/tracks` needs a
`bypass()`.

## Also relevant

- `docs/architecture/api.md` — what every endpoint accepts and returns
- `docs/i18n.md` — all user-facing copy goes through `@transcendence/i18n`
- `docs/peaks.md` — the `.peaks` binary format `lib/peaks.ts` decodes
- `design/README.md` (repo root) — the visual reference; a mockup, not code to import
