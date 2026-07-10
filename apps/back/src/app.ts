import Fastify, { type FastifyError, type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { ConflictError, type ErrorReponse, ForbiddenError, NotFoundError, UnauthorizedError } from './domain/errors';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';

import { audioRoutes } from './routes/audioFile';
export async function buildApp(): Promise<FastifyInstance> {
  // TODO: ajouter trustProxy aux options du constructeur a cause du reverse-proxy?
  const app = Fastify({
    logger:
      process.env.NODE_ENV === 'production'
        ? true
        : {
            transport: {
              options: { ignore: 'pid,hostname', translateTime: 'HH:MM:ss Z' },
              target: 'pino-pretty',
            },
          },
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
  await app.register(audioRoutes, { prefix: '/api/audio'});
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(userRoutes, { prefix: '/api/user' });

  return app;
}
