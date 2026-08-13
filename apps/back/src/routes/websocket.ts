import type { FastifyInstance } from 'fastify';
import { websocketController } from '../controllers/websocket';

export function websocketRoutes(app: FastifyInstance) {
  app.get('/ws', { preHandler: app.authenticate, websocket: true }, websocketController.ws);
}
