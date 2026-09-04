# Database

App: `apps/back` (Prisma 7 + PostgreSQL 18)

A single **PostgreSQL 18** container. The backend connects through **Prisma**
with the `@prisma/adapter-pg` driver adapter. Only relational data lives in the
DB — audio binaries stay on disk (see
[audio-file-storage.md](./audio-file-storage.md)).

> `AudioFile` was renamed `Sample` (and `AudioFileKind` → `SampleKind`, minus its
> dead `TRACK` member; the unused `AudioType` enum was dropped) so the model no
> longer collided with the rendered project **tracks**, which now exist as their
> own `Track` model.

## Two databases, one instance

| Database             | Used by     | Created by                                                    |
| -------------------- | ----------- | ------------------------------------------------------------- |
| `transcendence_dev`  | development | The container, from `POSTGRES_DB` in `apps/back/.env`         |
| `transcendence_prod` | production  | `infra/postgres/init_databases.sql` (runs on first init only) |

`POSTGRES_URL` decides which one you hit. Init scripts only run when the
`db_data` volume is empty — wipe it (`pnpm services:kill`) to re-run them.

## Environment variables

Read from `apps/back/.env` (dev) / `apps/back/.env.prod` (prod), both
git-ignored — copy from the `.env.example` / `.env.prod.example` templates.

| Variable                                              | Purpose                                        |
| ----------------------------------------------------- | ---------------------------------------------- |
| `POSTGRES_URL`                                        | Prisma connection string                       |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credentials + DB the container creates on init |

```env
# dev  — backend on host, DB port published to localhost
POSTGRES_URL=postgresql://<user>:<password>@localhost:5432/transcendence_dev?schema=public
# prod — backend in a container, DB reached by service name
POSTGRES_URL=postgresql://<user>:<password>@db:5432/transcendence_prod?schema=public
```

The shared client is built in `apps/back/src/utils/prisma.ts`.

## The generated client

Prisma reads `schema.prisma` and generates a typed client: one method set per
model, plus the TypeScript types for rows, inputs and enums. Two things about ours
are not the defaults:

- **It is generated into the source tree, not `node_modules`** —
  `apps/back/src/generated/prisma/` — and **committed**. So import model types from
  `../generated/prisma/client` and enums from `../generated/prisma/enums`, never
  from `@prisma/client`.
- **The client is instantiated once** in `utils/prisma.ts` and imported from there.
  A second `new PrismaClient()` opens a second connection pool.

A schema change is therefore two steps: `db:migrate` (writes the SQL migration and
applies it to `transcendence_dev`) and `db:generate` (rewrites the committed
client). Commit both.

## Schema

`apps/back/prisma/schema.prisma`:

| Model                     | Purpose                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Owner`                   | Owns samples, projects and tracks. `type` = `PLATEFORM` or `USER`. Optionally maps to one `User`.                                                                              |
| `User`                    | Account: `email` / `handle` / `artistName` (unique), hashed `password`, profile fields, `role`, `avatarUpdatedAt?`.                                                            |
| `Sample`                  | Metadata: `name`, `visibility`, `url`, `duration` (ms, `Float`), `bytes`, optional `bpm` / `key` / `mode` / `family` / `kind`. Belongs to an `Owner`.                          |
| `Track`                   | A rendered export: `title`, `description?`, `visibility`, `url`, `duration`, `bytes`, optional `bpm` / `key` / `mode`. Belongs to an `Owner`, optionally to a `StudioProject`. |
| `StudioProject`           | A studio session: serialized `state` (`Bytes`), `name`, `duration`, `bpm`, `visibility`, `type`, `archived`, optional `key` / `mode`. Belongs to an `Owner`.                   |
| `Session`                 | Auth session: `expiresAt`, `revokedAt?`, `userAgent?`. Cascades on user delete.                                                                                                |
| `Conversation`            | A DM thread: `pairKey` (unique), `lastMessageAt`.                                                                                                                              |
| `ConversationParticipant` | Join row `(conversationId, userId)` carrying that participant's `unreadCount` and `lastReadAt`.                                                                                |
| `Message`                 | `content`, `createdAt`, and both ends of the exchange as participant references.                                                                                               |

Relationships: `User` 1–1 `Owner`; `Owner` 1–N `Sample` / `Track` /
`StudioProject`; `Sample` N–N `StudioProject` (the samples a project uses);
`StudioProject` 1–N `Track`; `User` 1–N `Session`; `User` N–N `User` (follow
graph `UserFollows`); `Conversation` 1–N `ConversationParticipant` 1–N
`Message`.

Three modelling decisions worth knowing before you touch these tables:

- **`Track.projectId` is nullable with `onDelete: SetNull`.** A track outlives
  the project it came from: deleting a session must not delete the audio the user
  published from it, so the link is severed rather than cascaded.
- **`Conversation.pairKey` is a unique canonical key for the pair of users.**
  Without it, two people opening a DM at the same moment would each create a
  thread. The uniqueness constraint makes the race impossible at the DB level
  instead of relying on application-level checks.
- **`Message` points at `ConversationParticipant`, not at `User`,** through the
  composite foreign keys `(conversationId, authorId)` and `(conversationId, toId)`.
  That makes "author is a participant of this conversation" a referential
  integrity guarantee rather than something a query has to verify. See
  [chat.md](./chat.md).

Enums:

| Enum             | Values                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Role`           | `ADMIN`, `ARTIST`, `MODERATOR`, `GUEST` — mirrored by hand in `packages/permissions` (`Role`, `Permissions`, `can()`)                                              |
| `OwnerType`      | `PLATEFORM`, `USER`                                                                                                                                                |
| `VisibilityType` | `PRIVATE`, `SHARED`, `PUBLIC`                                                                                                                                      |
| `ProjectType`    | `MIX`, `PRODUCE` (default), `RECORD` — which of the three creative tools a project belongs to                                                                      |
| `Key`            | 17 values, naturals plus sharps and flats: `A_key`, `A_sharp_key`, `B_flat_key`, … `A_flat_key`                                                                    |
| `Mode`           | `MAJOR`, `MINOR`                                                                                                                                                   |
| `Family`         | 18 values: `KICK`, `SNARE`, `CLAP`, `HAT`, `TOM`, `PERC`, `CYMBAL`, `BASS`, `SYNTH`, `LEAD`, `PAD`, `KEYS`, `PLUCK`, `STRINGS`, `BRASS`, `VOCAL`, `FX`, `AMBIENCE` |
| `SampleKind`     | `ONE_SHOT`, `LOOP`                                                                                                                                                 |

`Key`'s members carry a `_key` suffix and spell out accidentals (`C_sharp_key`)
because `C#` is not a valid identifier. Frontends map them to display labels
rather than showing the raw value.

## Migrations & scripts

Run as `pnpm --filter @transcendence/back <script>`:

| Script        | What it does                                        |
| ------------- | --------------------------------------------------- |
| `db:generate` | Regenerate the Prisma client                        |
| `db:migrate`  | Create/apply a dev migration (`prisma migrate dev`) |
| `db:reset`    | Drop, recreate, re-migrate, re-seed the dev DB      |
| `db:seed`     | Seed dev fixtures                                   |
| `db:studio`   | Open Prisma Studio                                  |

In production the backend's `docker-entrypoint.sh` runs `prisma migrate deploy`
and the production seed before starting.
