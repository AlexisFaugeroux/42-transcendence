import type { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth';

const registerSchema = {
  body: {
    properties: {
      email: { format: 'email', type: 'string' },
      password: { maxLength: 128, minLength: 8, type: 'string' },
      pseudo: { maxLength: 32, minLength: 1, type: 'string' },
    },
    required: ['email', 'pseudo', 'password'],
    type: 'object',
  },
};

export function authRoutes(app: FastifyInstance) {
  app.post(
    '/api/auth/register',
    { config: { rateLimit: { max: 5, timeWindow: '1 minute' } }, schema: registerSchema },
    authController.register,
  );
}
