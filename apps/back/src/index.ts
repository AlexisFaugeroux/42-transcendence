import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', (_, reply) => {
  reply.send('OK\n');
});

app.get('/ping', (_, reply) => {
  reply.send('pong\n');
});

app.listen({ port: 8080 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
