# Database

Status: exploratory
Last updated: 2026-05-28

## Current approach: PostgreSQL in Docker

Run a **PostgreSQL container** (Alpine image) for development and production.
The Node.js backend connects to it directly. Audio files stay on the VPS disk,
not in the database — Postgres holds relational data only (users, file metadata,
projects, sessions).

### Docker setup

```yaml
# docker-compose.yml (excerpt)
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: transcendence
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: transcendence
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Connection

The backend connects via a standard connection string:

```env
DATABASE_URL=postgresql://transcendence:${DB_PASSWORD}@localhost:5432/transcendence
```

## Possible future migration: Supabase

We may later migrate to **Supabase** (hosted Postgres + Auth + RLS + realtime).
This would offload database hosting from the VPS and add built-in auth /
row-level security. The relational schema would carry over since Supabase runs
standard PostgreSQL.

Key benefits of a Supabase migration:
- Built-in auth (Supabase Auth) instead of rolling our own
- Row Level Security (RLS) for client-direct access patterns
- Keeps the VPS lightweight (nginx + Node.js only)

This is not planned for the MVP — just noted as a potential evolution.

## Open questions

- Auth strategy (custom JWT vs future Supabase Auth)
- Migration tooling (raw SQL scripts, a migration library, or Supabase CLI later)
- Schema design for users, sessions, samples, projects
