import type { FastifyInstance } from 'fastify';
import { healthController } from '../controllers/health/health';

const healthResponseSchema = {
  additionalProperties: false,
  properties: {
    database: { enum: ['ok', 'unreachable'], type: 'string' },
    status: { enum: ['ok', 'unavailable'], type: 'string' },
  },
  required: ['status', 'database'],
  type: 'object',
};

const getHealthSchema = {
  description:
    'Liveness probe. Answers 200 when the server is up and PostgreSQL answers a trivial query, 503 otherwise. Public, never rate limited.',
  response: {
    200: healthResponseSchema,
    503: healthResponseSchema,
  },
  security: [],
  summary: 'Health check',
  tags: ['health'],
};

export function healthRoutes(app: FastifyInstance) {
  app.get(
    '',
    {
      logLevel: 'warn',
      schema: getHealthSchema,
    },
    healthController.get,
  );
}
