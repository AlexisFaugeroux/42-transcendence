# Database

Status: exploratory
Last updated: 2026-05-26

## Preferred solution: Supabase

Use **Supabase** as the database and auth layer instead of running PostgreSQL
on the VPS. This keeps the VPS lightweight (nginx + Node.js only, ~512 MB RAM)
and makes 2 GB VPS RAM sufficient.

### Free tier limits

- 500 MB database storage — sufficient for relational data (users, file
  metadata, projects). Audio files live on the VPS disk, not in the DB.
- 1 GB file storage (unused — we serve files from the VPS)
- 50,000 monthly active users
- Project pauses after 1 week of inactivity on free tier

### How it connects

The Node.js backend and/or the client use `@supabase/supabase-js`:

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Two access patterns:
- **Backend as middleman** — API receives requests, queries Supabase, returns results
- **Client direct** — browser talks to Supabase for auth/realtime, secured by Row Level Security (RLS)

Both can coexist.

### Local development

The Supabase CLI runs a full local stack via Docker:

```bash
supabase start   # local Postgres, Auth, Storage, PostgREST on localhost:54321
supabase stop
```

Same `@supabase/supabase-js` client, same API, same RLS policies — just a
different URL via environment variables. No code branching between dev and prod.

```env
# .env.development
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<local-anon-key>

# .env.production
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=<prod-anon-key>
```

## Open questions

- Auth strategy: Supabase Auth vs custom
- Which tables need RLS policies
- Migration workflow (Supabase CLI migrations vs manual)
