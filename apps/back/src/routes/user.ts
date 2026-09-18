import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { userController } from '../controllers/user/user';
import { authUserResponseSchema, onlineUsersResponseSchema } from './schemas/user';

const updateProfileSchema = {
  description:
    'Partial update of the authenticated account: identity, handle, artist name, bio, location and external links.',
  summary: 'Update your profile',
  tags: ['user'],
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
  response: {
    200: authUserResponseSchema,
  },
};

const changePasswordSchema = {
  description:
    'Requires the current password. Session-only: an API key cannot change the password of its own account.',
  summary: 'Change your password',
  tags: ['user'],
  body: {
    additionalProperties: false,
    properties: {
      newPassword: { maxLength: 128, minLength: 8, type: 'string' },
      oldPassword: { maxLength: 128, minLength: 8, type: 'string' },
    },
    required: ['oldPassword', 'newPassword'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
};

const deleteAccountSchema = {
  description:
    'Permanently delete the authenticated account and everything that cascades from it. Session-only: an API key cannot delete its own account.',
  response: {
    204: { type: 'null' },
  },
  summary: 'Delete your account',
  tags: ['user'],
};

const deleteAvatarSchema = {
  description: 'Remove your avatar. The generated default is shown again afterwards.',
  response: {
    204: { type: 'null' },
  },
  summary: 'Delete your avatar',
  tags: ['user'],
};

const uploadAvatarSchema = {
  description:
    'Multipart upload of a JPEG, PNG or WebP image, converted server-side and served publicly from /avatars/.',
  summary: 'Upload your avatar',
  tags: ['user'],
  response: {
    200: authUserResponseSchema,
  },
};

const listFollowingSchema = {
  description: 'The producers you follow, each with the presence known to the WebSocket registry.',
  response: {
    200: onlineUsersResponseSchema,
  },
  summary: 'List who you follow, with their online status',
  tags: ['user'],
};

const listFollowersSchema = {
  description:
    'The producers who follow you, each with the presence known to the WebSocket registry.',
  response: {
    200: onlineUsersResponseSchema,
  },
  summary: 'List your followers, with their online status',
  tags: ['user'],
};

export function userRoutes(app: FastifyInstance) {
  app.put(
    '/update/profile',
    {
      config: { rateLimit: RATE_LIMITS.auth },
      preHandler: app.authenticate,
      schema: updateProfileSchema,
    },
    userController.updateProfile,
  );

  app.put(
    '/update/password',
    {
      config: { rateLimit: RATE_LIMITS.auth },
      preHandler: app.authenticateSession,
      schema: changePasswordSchema,
    },
    userController.updatePassword,
  );

  app.delete(
    '/delete',
    {
      config: { rateLimit: RATE_LIMITS.destructive },
      preHandler: app.authenticateSession,
      schema: deleteAccountSchema,
    },
    userController.deleteUser,
  );

  app.post(
    '/upload/avatar',
    {
      config: { rateLimit: RATE_LIMITS.upload },
      preHandler: app.authenticate,
      schema: uploadAvatarSchema,
    },
    userController.uploadAvatar,
  );

  app.get(
    '/listFollowing',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: listFollowingSchema,
    },
    userController.listFollowingById,
  );

  app.get(
    '/listFollowers',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: listFollowersSchema,
    },
    userController.listFollowersById,
  );

  app.delete(
    '/delete/avatar',
    { preHandler: app.authenticate, schema: deleteAvatarSchema },
    userController.deleteAvatar,
  );
}
