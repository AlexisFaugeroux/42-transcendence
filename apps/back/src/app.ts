import multipart from '@fastify/multipart';
import websocket from '@fastify/websocket';
import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { MAX_UPLOAD_BYTES } from './constants';
import {
  BadRequestError,
  ConflictError,
  type ErrorReponse,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  PayloadTooLargeError,
  UnauthorizedError,
} from './domain/errors';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth';
import { producerRoutes } from './routes/producer';
import { projectRoutes } from './routes/project';
import { sampleRoutes } from './routes/sample';
import { userRoutes } from './routes/user';
import { websocketRoutes } from './routes/websocket';
export async function buildApp(): Promise<FastifyInstance> {
  // TODO: ajouter trustProxy aux options du constructeur a cause du reverse-proxy?
  const app = Fastify({
    ajv: {
      customOptions: { removeAdditional: false },
    },
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

  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply<ErrorReponse>) => {
      if (error.validation) {
        request.log.warn(error);
        return reply.code(400).send({ error: error.message, status: 400 });
      }
      if (error instanceof BadRequestError) {
        request.log.warn(error);
        return reply.code(400).send({ error: error.message, status: 400 });
      }
      if (error instanceof UnauthorizedError) {
        request.log.warn(error);
        return reply.code(401).send({ error: error.message, status: 401 });
      }
      if (error instanceof ForbiddenError) {
        request.log.warn(error);
        return reply.code(403).send({ error: error.message, status: 403 });
      }
      if (error instanceof NotFoundError) {
        request.log.warn(error);
        return reply.code(404).send({ error: error.message, status: 404 });
      }
      if (error instanceof ConflictError) {
        request.log.warn(error);
        return reply.code(409).send({ error: error.message, status: 409 });
      }
      if (error instanceof PayloadTooLargeError) {
        request.log.error(error);
        return reply.code(413).send({ error: error.message, status: 413 });
      }
      if (error instanceof InternalServerError) {
        request.log.error(error);
        return reply.code(500).send({ error: error.message, status: 500 });
      }

      request.log.error(error);
      return reply.code(500).send({ error: 'internal error', status: 500 });
    },
  );

  await app.register(multipart, {
    limits: {
      files: 1,
      fileSize: MAX_UPLOAD_BYTES,
    },
  });

  await app.register(authPlugin);
  await app.register(websocket);
  await app.register(websocketRoutes, { prefix: '/api' });
  await app.register(sampleRoutes, { prefix: '/api/samples' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(userRoutes, { prefix: '/api/user' });
  await app.register(producerRoutes, { prefix: '/api/users' });
  await app.register(projectRoutes, { prefix: '/api/project' });

  return app;
}
