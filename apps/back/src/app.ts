import cors from '@fastify/cors';
import Fastify, { type FastifyError, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from './domain/errors';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth';

export async function buildApp(): Promise<FastifyInstance> {
  // TODO: ajouter trustProxy aux options du constructeur a cause du reverse-proxy?
  const app = Fastify({ logger: true });

  await app.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: 'http://localhost:5173',
  });

  await app.register(authPlugin);
  await app.register(authRoutes);

  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof UnauthorizedError) {
      return reply.code(401).send({ error: error.message });
    }
    if (error instanceof ForbiddenError) {
      return reply.code(403).send({ error: error.message });
    }
    if (error instanceof NotFoundError) {
      return reply.code(404).send({ error: error.message });
    }
    if (error instanceof ConflictError) {
      return reply.code(409).send({ error: error.message });
    }

    request.log.error(error);
    return reply.code(500).send({ error: 'internal error' });
  });

  return app;
}
