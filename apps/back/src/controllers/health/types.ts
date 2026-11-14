import type { RouteGenericInterface } from 'fastify';

export interface HealthResponse {
  status: 'ok' | 'unavailable';
  database: 'ok' | 'unreachable';
}

export interface GetHealthRoute extends RouteGenericInterface {
  Reply: HealthResponse;
}
