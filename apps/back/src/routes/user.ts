import { Role } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user/user';

const authUserSchema = {
  additionalProperties: false,
  properties: {
    artistName: { type: 'string' },
    avatarUpdatedAt: { type: ['string', 'null'] },
    bio: { type: 'string' },
    email: { type: 'string' },
    firstname: { type: 'string' },
    handle: { type: 'string' },
    id: { type: 'string' },
    joined: { format: 'date-time', type: 'string' },
    lastname: { type: 'string' },
    links: {
      items: {
        additionalProperties: false,
        properties: {
          kind: { type: 'string' },
          url: { type: 'string' },
        },
        required: ['kind', 'url'],
        type: 'object',
      },
      type: ['array', 'null'],
    },
    location: { type: 'string' },
    ownerId: { type: 'string' },
    role: { enum: Object.values(Role), type: 'string' },
  },
  required: [
    'id',
    'ownerId',
    'artistName',
    'email',
    'joined',
    'firstname',
    'lastname',
    'avatarUpdatedAt',
    'handle',
    'role',
  ],
  type: 'object',
};

const authUserResponseSchema = {
  additionalProperties: false,
  properties: {
    user: authUserSchema,
  },
  required: ['user'],
  type: 'object',
};

const onlineUserSchema = {
  additionalProperties: false,
  properties: {
    artistName: { type: 'string' },
    handle: { type: 'string' },
    id: { type: 'string' },
    status: { enum: ['online', 'offline'], type: 'string' },
  },
  required: ['id', 'handle', 'status', 'artistName'],
  type: 'object',
};

const onlineUsersResponseSchema = {
  items: onlineUserSchema,
  type: 'array',
};

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
  response: {
    200: authUserResponseSchema,
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

const uploadAvatarSchema = {
  response: {
    201: authUserResponseSchema,
  },
};

const listOnlineUsersSchema = {
  response: {
    200: onlineUsersResponseSchema,
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

  app.post(
    '/upload/avatar',
    {
      preHandler: app.authenticate,
      schema: uploadAvatarSchema,
    },
    userController.uploadAvatar,
  );

  app.get(
    '/listFollowing',
    {
      preHandler: app.authenticate,
      schema: listOnlineUsersSchema,
    },
    userController.listFollowingById,
  );

  app.get(
    '/listFollowers',
    {
      preHandler: app.authenticate,
      schema: listOnlineUsersSchema,
    },
    userController.listFollowersById,
  );

  app.delete('/delete/avatar', { preHandler: app.authenticate }, userController.deleteAvatar);
}
