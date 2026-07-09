import cors from '@fastify/cors';
import Fastify, { type FastifyError, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { ConflictError, type ErrorReponse, ForbiddenError, NotFoundError, UnauthorizedError } from './domain/errors';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth';

export async function buildApp(): Promise<FastifyInstance> {
  // TODO: ajouter trustProxy aux options du constructeur a cause du reverse-proxy?
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { ignore: 'pid,hostname', translateTime: 'HH:MM:ss Z' },
      },
    },
  });

  await app.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: 'http://localhost:5173',
  });

  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply<ErrorReponse>) => {
    if (error instanceof UnauthorizedError) {
      return reply.code(401).send({ error: error.message, status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return reply.code(403).send({ error: error.message, status: 403 });
    }
    if (error instanceof NotFoundError) {
      return reply.code(404).send({ error: error.message, status: 404 });
    }
    if (error instanceof ConflictError) {
      return reply.code(409).send({ error: error.message, status: 409 });
    }

    request.log.error(error);
    return reply.code(500).send({ error: 'internal error', status: 500 });
  });

  await app.register(authPlugin);
  await app.register(authRoutes);

  return app;
}
