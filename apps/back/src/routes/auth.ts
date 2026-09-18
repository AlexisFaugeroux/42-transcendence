import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { authController } from '../controllers/auth/auth';
import { authUserResponseSchema } from './schemas/user';

const registerSchema = {
  body: {
    additionalProperties: false,
    properties: {
      artistName: { maxLength: 32, minLength: 1, type: 'string' },
      email: { format: 'email', type: 'string' },
      firstname: { maxLength: 64, minLength: 1, type: 'string' },
      handle: { maxLength: 32, minLength: 3, pattern: '^[\\w.]+$', type: 'string' },
      lastname: { maxLength: 64, minLength: 1, type: 'string' },
      password: { maxLength: 128, minLength: 8, type: 'string' },
      role: { enum: ['ARTIST', 'GUEST'], type: 'string' },
    },
    required: ['email', 'firstname', 'lastname', 'handle', 'artistName', 'password', 'role'],
    type: 'object',
  },
  response: {
    201: authUserResponseSchema,
  },
};

const loginSchema = {
  body: {
    additionalProperties: false,
    properties: {
      email: { format: 'email', type: 'string' },
      password: { minLength: 1, type: 'string' },
    },
    required: ['email', 'password'],
    type: 'object',
  },
  response: {
    200: authUserResponseSchema,
  },
};

const meSchema = {
  response: {
    200: authUserResponseSchema,
  },
};

const logoutSchema = {
  response: {
    204: { type: 'null' },
  },
};

export function authRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    { config: { rateLimit: RATE_LIMITS.auth }, schema: registerSchema },
    authController.register,
  );

  app.post(
    '/login',
    { config: { rateLimit: RATE_LIMITS.auth }, schema: loginSchema },
    authController.login,
  );

  app.get('/me', { preHandler: app.authenticate, schema: meSchema }, authController.me);

  app.post(
    '/logout',
    { preHandler: app.authenticate, schema: logoutSchema },
    authController.logout,
  );

  app.get('/check-access', { preHandler: app.authenticate }, authController.checkAccess);
}
