import Fastify, { type FastifyInstance } from 'fastify';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });

  app.get('/', (_, reply) => {
    reply.send('OK\n');
  });

  app.get('/ping', (_, reply) => {
    reply.send('pong\n');
  });

  return app;
}
