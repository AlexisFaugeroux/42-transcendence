import type { FastifyReply, FastifyRequest } from 'fastify';
import { healthRepository } from '../../repositories/health/health';
import type { GetHealthRoute } from './types';

class HealthController {
  public get = async (
    req: FastifyRequest<GetHealthRoute>,
    reply: FastifyReply<GetHealthRoute>,
  ): Promise<void> => {
    try {
      await healthRepository.ping();
    } catch (error) {
      req.log.error(error, 'health check: database unreachable');
      reply.code(503).send({ database: 'unreachable', status: 'unavailable' });
      return;
    }

    reply.code(200).send({ database: 'ok', status: 'ok' });
  };
}

export const healthController = new HealthController();
