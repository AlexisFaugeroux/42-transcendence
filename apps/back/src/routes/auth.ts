import type { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth';

const registerSchema = {
  body: {
    properties: {
      email: { format: 'email', type: 'string' },
      firstname: { maxLength: 64, minLength: 1, type: 'string' },
      handle: { maxLength: 32, minLength: 3, pattern: '^[\\w.]+$', type: 'string' },
      lastname: { maxLength: 64, minLength: 1, type: 'string' },
      password: { maxLength: 128, minLength: 8, type: 'string' },
      artistName: { maxLength: 32, minLength: 1, type: 'string' },
    },
    required: ['email', 'firstname', 'lastname', 'handle', 'artistName', 'password'],
    type: 'object',
  },
};

const loginSchema = {
  body: {
    properties: {
      email: { format: 'email', type: 'string' },
      password: { minLength: 1, type: 'string' },
    },
    required: ['email', 'password'],
    type: 'object',
  },
};

export function authRoutes(app: FastifyInstance) {
  app.post(
    '/api/auth/register',
    { config: { rateLimit: { max: 5, timeWindow: '1 minute' } }, schema: registerSchema },
    authController.register,
  );

  app.post(
    '/api/auth/login',
    { config: { rateLimit: { max: 5, timeWindow: '1 minute' } }, schema: loginSchema },
    authController.login,
  );

  app.get('/api/auth/me', { preHandler: app.authenticate }, authController.me);

  app.post('/api/auth/logout', { preHandler: app.authenticate }, authController.logout);
  app.get('/api/auth/check-access', { preHandler: app.authenticate }, authController.checkAccess);
}
