# Pagination (server-side)

Shared contract for list endpoints that return pages of results.

## Query params

| Param   | Type   | Default | Notes                                       |
| ------- | ------ | ------- | ------------------------------------------- |
| `page`  | string | -       | 1-based. Invalid → 400                      |
| `limit` | string | -       | Max `100`. Invalid / over max → 400         |
| `q`     | string | -       | Optional search. Trimmed; empty = no filter |

Parsed by `parsePagination` in `apps/back/src/utils/pagination.ts`.
Constants: `PAGINATION_DEFAULT_LIMIT`, `PAGINATION_MAX_LIMIT` in `apps/back/src/constants.ts`.

**No `page` and no `limit`** → full list (no `skip`/`take` in Prisma). Response still uses `{ items, total, page: 1, limit: total }`.

**Either param present** → paginated. Missing one uses default (`page` → 1, `limit` → 20).

## Response shape

```json
{
  "items": [],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

- Back type: `PaginatedResponse<T>` (`apps/back/src/domain/pagination.ts`)
- Front type: `Paginated<T>` (`apps/front/src/types/pagination.ts`)

## Search (`q`)

Case-insensitive `contains` filter. `total` counts matches, not the full list.

| Endpoint                           | Fields matched         |
| ---------------------------------- | ---------------------- |
| `GET /api/users`                   | `handle`, `artistName` |
| `GET /api/users/:handle/followers` | same                   |
| `GET /api/users/:handle/following` | same                   |
| `GET /api/samples/get`             | `name`                 |

## Covered endpoints

| Endpoint                           | Notes                                                          |
| ---------------------------------- | -------------------------------------------------------------- |
| `GET /api/users`                   | Public producers list                                          |
| `GET /api/users/:handle/followers` |                                                                |
| `GET /api/users/:handle/following` |                                                                |
| `GET /api/samples/get`             | Existing filters kept; `page`/`limit`/`q` stripped before repo |

## UI

antd `Pagination` via `@transcendence/ui`. Page size fixed at 20 (`showSizeChanger={false}`).
React Query `queryKey` includes `page`, `limit`, and `q` (debounced ~300 ms on search inputs).
Reset to page 1 when `q` changes.

Non-paginated clients (ex: studio sample browser) omit `page`/`limit` and read `items`.
