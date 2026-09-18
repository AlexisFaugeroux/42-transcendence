import type { FastifyReply, FastifyRequest } from 'fastify';
import { BadRequestError, NotFoundError } from '../../domain/errors';
import { ApiKeyRepository, apiKeyRepository } from '../../repositories/apiKey/apiKey';
import type { CreateApiKeyRoute, GetApiKeysRoute, RevokeApiKeyRoute } from './types';

class ApiKeyController {
  public create = async (
    req: FastifyRequest<CreateApiKeyRoute>,
    reply: FastifyReply<CreateApiKeyRoute>,
  ): Promise<void> => {
    const userId = req.authUser.id;

    const active = await apiKeyRepository.countActiveForUser(userId);
    if (active >= ApiKeyRepository.MAX_PER_USER) {
      throw new BadRequestError(
        `An account cannot hold more than ${String(ApiKeyRepository.MAX_PER_USER)} active API keys`,
      );
    }

    const created = await apiKeyRepository.create(userId, req.body.name, req.body.expiresInDays);

    reply.code(201).send(created);
  };

  public get = async (
    req: FastifyRequest<GetApiKeysRoute>,
    reply: FastifyReply<GetApiKeysRoute>,
  ): Promise<void> => {
    const { items, total } = await apiKeyRepository.listForUser(req.authUser.id);

    reply.code(200).send({ items, total });
  };

  public revoke = async (
    req: FastifyRequest<RevokeApiKeyRoute>,
    reply: FastifyReply<RevokeApiKeyRoute>,
  ): Promise<void> => {
    const revoked = await apiKeyRepository.revoke(req.query.id, req.authUser.id);
    if (revoked === 0) throw new NotFoundError('ApiKey not found');

    reply.code(204).send();
  };
}

export const apiKeyController = new ApiKeyController();
