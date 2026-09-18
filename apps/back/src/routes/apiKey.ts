import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { apiKeyController } from '../controllers/apiKey/apiKey';
import { apiKeyListResponseSchema, createdApiKeyResponseSchema } from './schemas/apiKey';

const createApiKeySchema = {
  body: {
    additionalProperties: false,
    properties: {
      expiresInDays: { maximum: 365, minimum: 1, type: 'integer' },
      name: { maxLength: 64, minLength: 1, type: 'string' },
    },
    required: ['name'],
    type: 'object',
  },
  description:
    'Create an API key. The plaintext key is returned once, in this response, and is never stored — it cannot be read again.',
  response: {
    201: createdApiKeyResponseSchema,
  },
  summary: 'Create an API key',
  tags: ['api-keys'],
};

const getApiKeysSchema = {
  description: 'List the active API keys of the authenticated account. Never returns a key value.',
  response: {
    200: apiKeyListResponseSchema,
  },
  summary: 'List your API keys',
  tags: ['api-keys'],
};

const revokeApiKeySchema = {
  description: 'Revoke one of your API keys. Revocation takes effect on the next request.',
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
  summary: 'Revoke an API key',
  tags: ['api-keys'],
};

export function apiKeyRoutes(app: FastifyInstance) {
  app.post(
    '/create',
    {
      config: { rateLimit: RATE_LIMITS.auth },
      preHandler: app.authenticateSession,
      schema: createApiKeySchema,
    },
    apiKeyController.create,
  );

  app.get(
    '/get',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticateSession,
      schema: getApiKeysSchema,
    },
    apiKeyController.get,
  );

  app.delete(
    '/revoke',
    {
      config: { rateLimit: RATE_LIMITS.destructive },
      preHandler: app.authenticateSession,
      schema: revokeApiKeySchema,
    },
    apiKeyController.revoke,
  );
}
