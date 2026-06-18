import { buildApp } from './app';

const app = await buildApp();

app.listen({ port: 8080 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
