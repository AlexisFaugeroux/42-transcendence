import { Permissions, Role } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { adminController } from '../controllers/admin/admin';
import { paginatedResponseSchema } from './schemas/pagination';
import { sessionListResponseSchema } from './schemas/session';
import { trackSchema } from './schemas/track';
import { adminUserSchema } from './schemas/user';

const userIdQuerySchema = {
  additionalProperties: false,
  properties: {
    id: { format: 'uuid', type: 'string' },
  },
  required: ['id'],
  type: 'object',
};

const getUsersSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      roles: {
        items: { enum: Object.values(Role), type: 'string' },
        minItems: 1,
        type: 'array',
        uniqueItems: true,
      },
      page: { type: 'string' },
      limit: { type: 'string' },
      q: { type: 'string' },
    },
    type: 'object',
  },
  response: {
    200: paginatedResponseSchema(adminUserSchema),
  },
};

const getTracksSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      page: { type: 'string' },
      limit: { type: 'string' },
      q: { type: 'string' },
    },
    type: 'object',
  },
  response: {
    200: paginatedResponseSchema(trackSchema),
  },
};

const updateUserSchema = {
  body: {
    additionalProperties: false,
    minProperties: 1,
    properties: {
      id: { format: 'uuid', type: 'string' },
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
    200: adminUserSchema,
  },
};

const updateUserRoleSchema = {
  body: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
      role: { enum: Object.values(Role), type: 'string' },
    },
    required: ['id', 'role'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
};

const listSessionsSchema = {
  querystring: userIdQuerySchema,
  response: {
    200: sessionListResponseSchema,
  },
};

const deleteUserSchema = {
  querystring: userIdQuerySchema,
  response: {
    204: { type: 'null' },
  },
};

const revokeSessionsSchema = {
  body: userIdQuerySchema,
  response: {
    204: { type: 'null' },
  },
};

export function adminRoutes(app: FastifyInstance) {
  app.get(
    '/users/get',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_READ)],
      schema: getUsersSchema,
    },
    adminController.getUsers,
  );

  app.put(
    '/users/update',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_WRITE)],
      schema: updateUserSchema,
    },
    adminController.updateUser,
  );

  app.get(
    '/users/sessions',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.SESSION_REVOKE)],
      schema: listSessionsSchema,
    },
    adminController.getSessions,
  );

  app.put(
    '/users/role',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_WRITE)],
      schema: updateUserRoleSchema,
    },
    adminController.updateRole,
  );

  app.delete(
    '/users/delete',
    {
      config: { rateLimit: RATE_LIMITS.destructive },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_DELETE)],
      schema: deleteUserSchema,
    },
    adminController.deleteUser,
  );

  app.post(
    '/users/revoke',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.SESSION_REVOKE)],
      schema: revokeSessionsSchema,
    },
    adminController.revokeSession,
  );

  app.get(
    '/tracks/get',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.TRACK_MODERATE)],
      schema: getTracksSchema,
    },
    adminController.getTracks,
  );
}
