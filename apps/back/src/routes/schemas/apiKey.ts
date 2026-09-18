export const apiKeySchema = {
  additionalProperties: false,
  properties: {
    createdAt: { format: 'date-time', type: 'string' },
    expiresAt: { format: 'date-time', type: ['string', 'null'] },
    id: { format: 'uuid', type: 'string' },
    lastUsedAt: { format: 'date-time', type: ['string', 'null'] },
    name: { type: 'string' },
    prefix: { type: 'string' },
  },
  required: ['id', 'name', 'prefix', 'lastUsedAt', 'expiresAt', 'createdAt'],
  type: 'object',
};

export const createdApiKeyResponseSchema = {
  additionalProperties: false,
  properties: {
    ...apiKeySchema.properties,
    key: { type: 'string' },
  },
  required: [...apiKeySchema.required, 'key'],
  type: 'object',
};

export const apiKeyListResponseSchema = {
  additionalProperties: false,
  properties: {
    items: { items: apiKeySchema, type: 'array' },
    total: { minimum: 0, type: 'integer' },
  },
  required: ['items', 'total'],
  type: 'object',
};
