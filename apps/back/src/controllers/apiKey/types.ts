import type { RouteGenericInterface } from 'fastify';
import type { ApiKeyListResponse, CreateApiKeyInput, CreatedApiKey } from '../../domain/apiKey';

export interface CreateApiKeyRoute extends RouteGenericInterface {
  Body: CreateApiKeyInput;
  Reply: CreatedApiKey;
}

export interface GetApiKeysRoute extends RouteGenericInterface {
  Reply: ApiKeyListResponse;
}

export interface RevokeApiKeyRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}
