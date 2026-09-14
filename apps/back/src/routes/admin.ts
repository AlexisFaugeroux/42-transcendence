import { Permissions, Role } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { adminController } from '../controllers/admin/admin';

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
};

// The profile fields an admin may rewrite. `role` and `password` are absent on
// purpose: the first has its own route and its own guard, the second would land
// in the database unhashed.
const updateUserSchema = {
  body: {
    additionalProperties: false,
    minProperties: 1,
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
  querystring: userIdQuerySchema,
};

const updateUserRoleSchema = {
  body: {
    additionalProperties: false,
    properties: {
      role: { enum: Object.values(Role), type: 'string' },
    },
    required: ['role'],
    type: 'object',
  },
  querystring: userIdQuerySchema,
};

const deleteUserSchema = {
  querystring: userIdQuerySchema,
};

const revokeSessionsSchema = {
  querystring: userIdQuerySchema,
};

export function adminRoutes(app: FastifyInstance) {
  app.get(
    '/users/get',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_READ)],
      schema: getUsersSchema,
    },
    adminController.get,
  );

  app.put(
    '/users/update',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_WRITE)],
      schema: updateUserSchema,
    },
    adminController.update,
  );

  app.put(
    '/users/role',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_WRITE)],
      schema: updateUserRoleSchema,
    },
    adminController.role,
  );

  app.delete(
    '/users/delete',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: [app.authenticate, app.authorize(Permissions.USER_DELETE)],
      schema: deleteUserSchema,
    },
    adminController.delete,
  );

  app.post(
    '/users/revoke',
    {
      config: { rateLimit: { max: 5, timeWindow: '1 minute' } },
      preHandler: [app.authenticate, app.authorize(Permissions.SESSION_REVOKE)],
      schema: revokeSessionsSchema,
    },
    adminController.revokeSession,
  );
}
