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
  description: 'Follow a producer. The followed account receives a live event over the WebSocket.',
  summary: 'Follow a producer',
  tags: ['producers'],
  params: handleParamsSchema,
  response: {
    204: { type: 'null' },
  },
};

const unfollowSchema = {
  description: 'Stop following a producer. Unfollowing someone you do not follow is a no-op.',
  summary: 'Unfollow a producer',
  tags: ['producers'],
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
      schema: {
        description: 'Every producer, searchable through q and paginated.',
        querystring: paginationQuerySchema,
        response: paginatedProducersResponse,
        summary: 'List producers',
        tags: ['producers'],
      },
    },
    userController.listProducers,
  );

  app.get(
    '/:handle',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        description: 'The public profile of a producer, addressed by their handle.',
        params: handleParamsSchema,
        response: { 200: producerProfileResponseSchema },
        summary: 'Get a producer profile',
        tags: ['producers'],
      },
    },
    userController.getProfile,
  );

  app.get(
    '/:handle/followers',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        description: 'The producers who follow this handle, paginated.',
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: paginatedProducersResponse,
        summary: 'List a producer followers',
        tags: ['producers'],
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
        description: 'The producers this handle follows, paginated.',
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: paginatedProducersResponse,
        summary: 'List who a producer follows',
        tags: ['producers'],
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
      schema: unfollowSchema,
    },
    userController.unfollow,
  );

  app.get(
    '/:handle/tracks',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: {
        description: 'The tracks published by this producer that you are allowed to see.',
        params: handleParamsSchema,
        querystring: producerTracksQuerySchema,
        response: { 200: tracksResponseSchema },
        summary: 'List a producer tracks',
        tags: ['producers'],
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
        description: 'The tracks this producer has liked, paginated.',
        params: handleParamsSchema,
        querystring: paginationQuerySchema,
        response: { 200: paginatedResponseSchema(trackSchema) },
        summary: 'List a producer liked tracks',
        tags: ['producers'],
      },
    },
    trackController.listLikedByHandle,
  );
}
