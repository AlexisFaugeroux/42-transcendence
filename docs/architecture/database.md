# Database

App: `apps/back` (Prisma 7 + PostgreSQL 18)

A single **PostgreSQL 18** container. The backend connects through **Prisma**
with the `@prisma/adapter-pg` driver adapter. Only relational data lives in the
DB — audio binaries stay on disk (see
[audio-file-storage.md](./audio-file-storage.md)).

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

The shared client is built in `apps/back/src/utils/prisma.ts`; the generated
client is committed under `apps/back/src/generated/prisma/` (see
[prisma.md](../prisma.md)).

## Schema

`apps/back/prisma/schema.prisma`:

| Model           | Purpose                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Owner`         | Owns audio files and projects. `type` = `PLATEFORM` or `USER`. Optionally maps to one `User`.                                                         |
| `User`          | Account: `email` / `handle` / `artistName` (unique), hashed `password`, profile fields, `role`.                                                       |
| `AudioFile`     | Metadata: `name`, `visibility`, `url`, `duration` (ms, `Float`), `bytes`, optional `bpm` / `key` / `mode` / `family` / `kind`. Belongs to an `Owner`. |
| `StudioProject` | A studio session: serialized `state` (`Bytes`), `name`, `duration`, `bpm`, `visibility`, optional `key` / `mode`. Belongs to an `Owner`.              |
| `Session`       | Auth session: `expiresAt`, `revokedAt?`, `userAgent?`. Cascades on user delete.                                                                       |

Relationships: `User` 1–1 `Owner`; `Owner` 1–N `AudioFile`; `Owner` 1–N
`StudioProject`; `AudioFile` N–N `StudioProject` (the samples a project uses);
`User` 1–N `Session`; `User` N–N `User` (follow graph `UserFollows`).

Enums:

| Enum             | Values                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Role`           | `ADMIN`, `ARTIST`                                                                                                                                                  |
| `OwnerType`      | `PLATEFORM`, `USER`                                                                                                                                                |
| `VisibilityType` | `PRIVATE`, `SHARED`, `PUBLIC`                                                                                                                                      |
| `Key`            | 17 values, naturals plus sharps and flats: `A_key`, `A_sharp_key`, `B_flat_key`, … `A_flat_key`                                                                    |
| `Mode`           | `MAJOR`, `MINOR`                                                                                                                                                   |
| `Family`         | 18 values: `KICK`, `SNARE`, `CLAP`, `HAT`, `TOM`, `PERC`, `CYMBAL`, `BASS`, `SYNTH`, `LEAD`, `PAD`, `KEYS`, `PLUCK`, `STRINGS`, `BRASS`, `VOCAL`, `FX`, `AMBIENCE` |
| `AudioFileKind`  | `ONE_SHOT`, `LOOP`, `TRACK`                                                                                                                                        |
| `AudioType`      | `SAMPLE`, `TRACK` — legacy, not referenced by any model                                                                                                            |

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
