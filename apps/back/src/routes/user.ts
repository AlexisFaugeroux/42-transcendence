import type { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user';

const updateProfileSchema = {
  body: {
    additionalProperties: false,
    properties: {
      artistName: { maxLength: 32, minLength: 1, type: 'string' },
      bio: { maxLength: 500, type: 'string' },
      email: { format: 'email', type: 'string' },
      firstname: { maxLength: 64, minLength: 1, type: 'string' },
      handle: { maxLength: 32, minLength: 3, pattern: '^[\\w.]+$', type: 'string' },
      lastname: { maxLength: 64, minLength: 1, type: 'string' },
      links: {
        items: {
          additionalProperties: false,
          properties: {
            kind: { maxLength: 32, minLength: 1, type: 'string' },
            url: { format: 'uri', maxLength: 2048, type: 'string' },
          },
          required: ['kind', 'url'],
          type: 'object',
        },
        maxItems: 10,
        type: 'array',
      },
      location: { maxLength: 128, type: 'string' },
    },
    type: 'object',
  },
};

const changePasswordSchema = {
  body: {
    properties: {
      newPassword: { maxLength: 128, minLength: 8, type: 'string' },
      oldPassword: { maxLength: 128, minLength: 8, type: 'string' },
    },
    required: ['oldPassword', 'newPassword'],
    type: 'object',
  },
};

export function userRoutes(app: FastifyInstance) {
  app.put(
    '/update/profile',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
      schema: updateProfileSchema,
    },
    userController.updateProfile,
  );

  app.put(
    '/update/password',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
      schema: changePasswordSchema,
    },
    userController.updatePassword,
  );

  app.delete(
    '/delete',
    {
      preHandler: app.authenticate,
    },
    userController.deleteUser,
  );
}

export function usersRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: app.authenticate,
    },
    userController.listProducers,
  );

  app.get(
    '/:handle',
    {
      preHandler: app.authenticate,
    },
    userController.getProfile,
  );

  app.get(
    '/:handle/followers',
    {
      preHandler: app.authenticate,
    },
    userController.listFollowers,
  );

  app.get(
    '/:handle/following',
    {
      preHandler: app.authenticate,
    },
    userController.listFollowing,
  );

  app.post(
    '/:handle/follow',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
    },
    userController.follow,
  );

  app.delete(
    '/:handle/follow',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: app.authenticate,
    },
    userController.unfollow,
  );
}
