import Fastify, { type FastifyInstance } from 'fastify';
import { authRoutes } from './routes/auth';
import authPlugin from './plugins/auth';

export async function buildApp(): Promise<FastifyInstance> {
  // TODO: ajouter trustProxy aux options du constructeur a cause du reverse-proxy?
  const app = Fastify({ logger: true });

  await app.register(authPlugin);
  await app.register(authRoutes);

  app.get('/', (_, reply) => {
    reply.send('OK\n');
  });

  app.get('/ping', (_, reply) => {
    reply.send('pong\n');
  });

  return app;
}
