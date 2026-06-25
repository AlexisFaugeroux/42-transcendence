import Fastify, { type FastifyInstance } from 'fastify';
import authPlugin from './plugins/auth';


export async function buildApp(): Promise<FastifyInstance> {
    const app = Fastify({ logger: true });
    
    await app.register(authPlugin);
    
    app.get('/', (_, reply) => {
        reply.send('OK\n');
    });
    
    app.get('/ping', (_, reply) => {
        reply.send('pong\n');
    });
    
    return app;
}
