export function paginatedResponseSchema(
  itemSchema: Record<string, unknown>,
): Record<string, unknown> {
  return {
    additionalProperties: false,
    properties: {
      items: { items: itemSchema, type: 'array' },
      limit: { minimum: 0, type: 'integer' },
      page: { minimum: 1, type: 'integer' },
      total: { minimum: 0, type: 'integer' },
    },
    required: ['items', 'total', 'page', 'limit'],
    type: 'object',
  };
}
