# Permissions & roles

Package: `packages/permissions` (`@transcendence/permissions`) — consumed by
`back`, `front` and `studio`.

Four roles with genuinely different powers, one authorization table shared by the
three apps, and a server-side check on every sensitive action. The button the UI
shows and the route the server allows derive from the **same** record, so they
cannot drift apart.

## The matrix

`ROLES_PERMISSIONS` in `src/can.ts` is the whole authorization model:

| Permission        | Value             | GUEST | ARTIST | MODERATOR | ADMIN |
| ----------------- | ----------------- | :---: | :----: | :-------: | :---: |
| `STUDIO_ACCESS`   | `studio:access`   |       |   ✓    |     ✓     |   ✓   |
| `SAMPLE_WRITE`    | `sample:write`    |       |   ✓    |     ✓     |   ✓   |
| `TRACK_WRITE`     | `track:write`     |       |   ✓    |     ✓     |   ✓   |
| `CHAT_ACCESS`     | `chat:access`     |       |   ✓    |     ✓     |   ✓   |
| `TRACK_MODERATE`  | `track:moderate`  |       |        |     ✓     |   ✓   |
| `USER_READ`       | `user:read`       |       |        |     ✓     |   ✓   |
| `USER_WRITE`      | `user:write`      |       |        |           |   ✓   |
| `USER_DELETE`     | `user:delete`     |       |        |           |   ✓   |
| `SESSION_REVOKE`  | `session:revoke`  |       |        |           |   ✓   |
| `MANAGE_ACCOUNTS` | `manage_accounts` |       |        |           |   ✓   |

A `GUEST` is a listener: they browse, follow, play public content and use nothing
else. Everything else is additive from there.

> `MANAGE_ACCOUNTS` is granted to `ADMIN` and **read by nobody**. It was the first
> permission written, before the back-office was split into `USER_READ` /
> `USER_WRITE` / `USER_DELETE` / `SESSION_REVOKE`, and the `/admin` nav entry that
> used it now gates on `USER_READ` (a moderator has to reach the back-office too).
> Delete it or give it a job; do not gate anything new on it.

`can(role, permission)` is a lookup in that record. It is the only authorization
primitive — there is no "is admin" helper anywhere, on purpose.

## Why a table and not a rank

A numeric rank (`GUEST < ARTIST < MODERATOR < ADMIN`) breaks the moment a role
stops being a strict superset of the one below. It also pushes
`role === 'ADMIN' || role === 'MODERATOR'` into every component, which has to be
edited in a dozen places the day a fifth role appears. An explicit table answers
one question — _does this role hold this permission_ — and a new role is one entry.

## Why a package

`front` and `studio` already share code through `@transcendence/auth`, but that
package exports React from its root, so the backend cannot import from it. The
authorization vocabulary is needed by all three, so it lives on its own in a
dependency-free TypeScript package.

`Role` and `Permissions` are plain `as const` objects with a matching type alias,
deliberately **not** TS enums: a `const enum` cannot be erased by the esbuild
bundle the backend ships, and a runtime object is what lets the backend map its
Prisma `Role` onto the same values.

**The Prisma `Role` enum and this package are kept in sync by hand.** Adding a role
means editing `schema.prisma`, migrating, and editing `src/roles.ts` — nothing
checks the two agree.

## The role travels in the session, not in the JWT

`authenticate` already loads the session row on every request to check revocation,
so `sessionRepository.findValid` selects the role in the same query and
`req.authUser` carries it:

```ts
req.authUser = { id: session.userId, role: session.role, sid: session.id };
```

No extra query, and **a role change takes effect on the account's next request**
rather than at its next login. Putting the role in the JWT would have meant a
stale token keeping its old powers for up to seven days, or a forced re-login on
every role change.

## The server guard

`app.authorize(permission)` (`plugins/auth.ts`) is a preHandler factory. It always
runs **after** `authenticate`, which is what puts `authUser.role` in place:

```ts
app.get(
  "/users/get",
  { preHandler: [app.authenticate, app.authorize(Permissions.USER_READ)] },
  adminController.getUsers,
);
```

It throws `ForbiddenError` → **403, never 401**. The distinction matters: the
frontend's `apiFetch` turns any 401 into an `auth:unauthorized` window event that
clears the user and logs the whole app out. A missing permission is not an expired
session, and answering 401 would kick a legitimately signed-in user to the login
screen.

Routes currently gated: `/api/project/*` and `/api/samples/upload|update|delete`
(`studio:access`, `sample:write`), `/api/tracks/upload|update` (`track:write`), all
five `/api/chat/*` (`chat:access`), and all of `/api/admin/*`. Full list in
[api.md](./api.md).

`chat:access` runs in both directions. Holding it is what lets an account open the
messaging, and **not** holding it is what makes an account unreachable: the chat
controller refuses a `toId` that cannot receive, and the WebSocket fan-out filters
the conversation's participants through the same `can()` before delivering a frame.
Otherwise a listener would accumulate messages in a page they cannot open.

## Ownership _or_ moderation

Moderation relaxes the existing business route, it does not duplicate it.
`DELETE /api/tracks/delete` has no `authorize` preHandler; the controller decides:

```ts
const isOwner = track.ownerId === user.ownerId;
if (!isOwner && !can(req.authUser.role, Permissions.TRACK_MODERATE))
  throw new ForbiddenError();
```

A second, admin-only deletion path would eventually forget one of the steps the
real one performs — the row, the `.wav` and its `.peaks` sidecar. One path, a wider
door.

> That deletion takes an `ownerId` to find the files on disk, and it must be
> **`track.ownerId`, not the caller's**. They are the same value until a moderator
> deletes somebody else's track, at which point passing the caller's id deletes the
> row and leaves the audio orphaned on the volume. See
> [audio-file-storage.md](./audio-file-storage.md).

## Choosing a role at signup

`POST /api/auth/register` requires a `role`, and its schema accepts
`['ARTIST', 'GUEST']` only — "I want to produce" vs "I want to listen and follow".
`MODERATOR` and `ADMIN` are unreachable from the public API by construction.

After that, **nobody changes their own role**: `PUT /api/admin/users/role` is the
only writer, it is gated on `USER_WRITE`, and it refuses `req.body.id ===
req.authUser.id`. Two more guards protect the install from locking itself out:
downgrading the **last** `ADMIN` is a 409, and so is deleting it. An admin cannot
delete their own account from the back-office either.

## Front-end

`@transcendence/auth` exposes the same `can()` through two hooks:

| Hook                      | Returns                                        | Use for                         |
| ------------------------- | ---------------------------------------------- | ------------------------------- |
| `useIsAllowed()`          | `(permission) => boolean`                      | several checks in one component |
| `usePermissions(perm[s])` | `boolean`; an array means **any of** (`.some`) | a single check                  |

They read the role from the authenticated user, so they only work under
`RequireAuth`.

Three consumers, all data-driven rather than hard-coded:

- **Routes** — `auth/RequirePermission` wraps a `<Route>` subtree and redirects to
  `/home` when the permission is missing (`App.tsx`). Guarding `/library`
  (`sample:write`), `/myTracks` (`track:write`), `/sessions` (`studio:access`),
  `/messages` (`chat:access`) and `/admin`. The `/admin` route passes an **array**
  — `USER_READ`, `USER_WRITE`, `USER_DELETE`, `SESSION_REVOKE`, `TRACK_MODERATE` —
  so any one of them opens it; the nav entry is narrower and gates on `USER_READ`
  alone.
- **Navigation** — `layout/navItems.ts` carries an optional `permission` per entry;
  `LeftNav` filters on it. An entry the user cannot open is never rendered.
- **Screens** — `pages/Admin/adminTabs.tsx` gates each back-office tab, and
  `pages/Admin/Users.tsx` only renders the Actions column and the role `Select`
  when `USER_WRITE` is held, so a moderator sees the account list read-only.

The studio does the same at its root: `App.tsx` checks `STUDIO_ACCESS` and refuses
a listener account before the audio engine boots.

**None of this is a security boundary.** It decides what is rendered; the server
decides what happens. Every permission enforced in the UI is enforced again in
`app.authorize` or in a controller.

## Related

- [api.md](./api.md) — which permission gates which route
- [../authentication.md](../authentication.md) — how the session is built and revoked
- [database.md](./database.md) — the Prisma `Role` enum
