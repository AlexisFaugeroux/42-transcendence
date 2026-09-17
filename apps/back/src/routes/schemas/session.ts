export const sessionListResponseSchema = {
  additionalProperties: false,
  properties: {
    items: {
      items: {
        additionalProperties: false,
        properties: {
          createdAt: { format: 'date-time', type: 'string' },
          expiresAt: { format: 'date-time', type: 'string' },
          id: { type: 'string' },
          userAgent: { type: ['string', 'null'] },
        },
        required: ['id', 'expiresAt', 'createdAt', 'userAgent'],
        type: 'object',
      },
      type: 'array',
    },
    total: { minimum: 0, type: 'integer' },
  },
  required: ['items', 'total'],
  type: 'object',
};
