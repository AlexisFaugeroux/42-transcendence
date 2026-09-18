import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { websocketController } from '../controllers/websocket/websocket';

export function websocketRoutes(app: FastifyInstance) {
  app.get(
    '/ws',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticateSession,
      websocket: true,
    },
    websocketController.ws,
  );
}
