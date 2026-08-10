import type { FastifyInstance } from 'fastify';
import { userController } from '../controllers/user';

export function producerRoutes(app: FastifyInstance) {
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
