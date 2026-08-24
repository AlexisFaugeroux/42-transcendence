import type { FastifyInstance } from 'fastify';
import { trackController } from '../controllers/track';
import { userController } from '../controllers/user';
import { producerTracksQuerySchema } from './track';

const handleParamsSchema = {
  additionalProperties: false,
  properties: {
    handle: { maxLength: 32, minLength: 3, pattern: '^[\\w.]+$', type: 'string' },
  },
  required: ['handle'],
  type: 'object',
};

const paginationQuerySchema = {
  additionalProperties: false,
  properties: {
    page: { type: 'string' },
    limit: { type: 'string' },
  },
  type: 'object',
};

export function producerRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: app.authenticate,
      schema: { querystring: paginationQuerySchema },
    },
    userController.listProducers,
  );

  app.get(
    '/:handle',
    {
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema },
    },
    userController.getProfile,
  );

  app.get(
    '/:handle/followers',
    {
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema, querystring: paginationQuerySchema },
    },
    userController.listFollowers,
  );

  app.get(
    '/:handle/following',
    {
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema, querystring: paginationQuerySchema },
    },
    userController.listFollowing,
  );

  app.post(
    '/:handle/follow',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema },
    },
    userController.follow,
  );

  app.delete(
    '/:handle/follow',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema },
    },
    userController.unfollow,
  );

  app.get(
    '/:handle/tracks',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema, querystring: producerTracksQuerySchema },
    },
    trackController.get,
  );
}
