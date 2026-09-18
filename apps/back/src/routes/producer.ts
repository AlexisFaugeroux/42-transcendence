import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { trackController } from '../controllers/track/track';
import { userController } from '../controllers/user/user';
import { paginatedResponseSchema } from './schemas/pagination';
import { trackSchema, tracksResponseSchema } from './schemas/track';
import { producerProfileResponseSchema, producerSchema } from './schemas/user';
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
    q: { type: 'string' },
  },
  type: 'object',
};

const paginatedProducersResponse = { 200: paginatedResponseSchema(producerSchema) };

const followSchema = {
  params: handleParamsSchema,
  response: {
    204: { type: 'null' },
  },
};

export function producerRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: { querystring: paginationQuerySchema, response: paginatedProducersResponse },
    },
    userController.listProducers,
  );

  app.get(
    '/:handle',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: { params: handleParamsSchema, response: { 200: producerProfileResponseSchema } },
    },
    userController.getProfile,
  );

  app.get(
    '/:handle/followers',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: paginatedProducersResponse,
      },
    },
    userController.listFollowerProducers,
  );

  app.get(
    '/:handle/following',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: paginatedProducersResponse,
      },
    },
    userController.listFollowing,
  );

  app.post(
    '/:handle/follow',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: app.authenticate,
      schema: followSchema,
    },
    userController.follow,
  );

  app.delete(
    '/:handle/follow',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: app.authenticate,
      schema: followSchema,
    },
    userController.unfollow,
  );

  app.get(
    '/:handle/tracks',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        params: handleParamsSchema,
        querystring: producerTracksQuerySchema,
        response: { 200: tracksResponseSchema },
      },
    },
    trackController.get,
  );

  app.get(
    '/:handle/liked',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: { 200: paginatedResponseSchema(trackSchema) },
      },
    },
    trackController.listLikedByHandle,
  );
}
