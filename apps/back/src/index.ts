import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', (request, reply) => {
  request;
  reply.send('OK\n');
});

app.get('/ping', (request, reply) => {
  request;
  reply.send('pong\n');
});

app.listen({ port: 8080 }, (err, address) => {
  address;
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
