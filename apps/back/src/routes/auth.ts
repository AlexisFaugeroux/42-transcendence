import type { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth';

const registerSchema = {
  body: {
    type: 'object',
    required: ['email', 'pseudo', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      pseudo: { type: 'string', minLength: 1, maxLength: 32 },
      password: { type: 'string', minLength: 8, maxLength: 128 },
    },
  },
};

export function authRoutes(app: FastifyInstance) {
  app.post('/api/auth/register', { schema: registerSchema, config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, authController.register);
}
