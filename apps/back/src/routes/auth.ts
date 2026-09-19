import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { authController } from '../controllers/auth/auth';
import { authUserResponseSchema, meResponseSchema } from './schemas/user';

const registerSchema = {
  description:
    'Register a new account and open a session. The role is chosen at signup and is either ARTIST or GUEST.',
  summary: 'Create an account',
  tags: ['auth'],
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
  description:
    'Exchange email and password for a session cookie. A new Session row is created; the JWT alone never grants access.',
  summary: 'Log in',
  tags: ['auth'],
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
  description:
    'Return the account behind the current session or API key, or null when there is none. Public on purpose: a visitor must be able to ask who they are without getting an error.',
  summary: 'Get the authenticated account',
  tags: ['auth'],
  response: {
    200: meResponseSchema,
  },
};

const logoutSchema = {
  description:
    'Revoke the current session and clear the cookie. Requires a session — an API key cannot log anything out.',
  summary: 'Log out',
  tags: ['auth'],
  response: {
    204: { type: 'null' },
  },
};

const checkAccessSchema = {
  description:
    'Internal endpoint called by nginx through auth_request before serving a file from /samples/ or /tracks/. Answers 200 when the current session or API key may read the requested path, 403 otherwise.',
  response: {
    200: { type: 'null' },
  },
  summary: 'Check access to a media file',
  tags: ['auth'],
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

  app.get('/me', { schema: meSchema }, authController.me);

  app.post(
    '/logout',
    { preHandler: app.authenticateSession, schema: logoutSchema },
    authController.logout,
  );

  app.get(
    '/check-access',
    { preHandler: app.authenticate, schema: checkAccessSchema },
    authController.checkAccess,
  );
}
