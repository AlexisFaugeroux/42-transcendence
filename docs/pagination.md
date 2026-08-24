# Pagination (server-side)

Shared contract for list endpoints that return pages of results.

## Query params


| Param   | Type   | Default | Notes                               |
| ------- | ------ | ------- | ----------------------------------- |
| `page`  | string | `1`     | 1-based. Invalid → 400              |
| `limit` | string | `20`    | Max `100`. Invalid / over max → 400 |


Parsed by `parsePagination` in `apps/back/src/utils/pagination.ts`.
Constants: `PAGINATION_DEFAULT_LIMIT`, `PAGINATION_MAX_LIMIT` in `apps/back/src/constants.ts`.

Internally the helper returns `{ page, limit, skip, take }` with
`skip = (page - 1) * limit` and `take = limit` for Prisma.

## Response shape

```json
{
  "items": [ /* T */ ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

- Back type: `PaginatedResponse<T>` (`apps/back/src/domain/pagination.ts`)
- Front type: `Paginated<T>` (`apps/front/src/types/pagination.ts`)



## Covered endpoints


| Endpoint                           | Notes                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| `GET /api/users`                   | Public producers list                                              |
| `GET /api/users/:handle/followers` |                                                                    |
| `GET /api/users/:handle/following` |                                                                    |
| `GET /api/samples/get`             | Existing filters kept; `page`/`limit` stripped before repo filters |




## UI

antd `Pagination` via `@transcendence/ui`. Page size fixed at 20 (`showSizeChanger={false}`).  
React Query includes `page` (and usually `limit`) in the `queryKey`.

