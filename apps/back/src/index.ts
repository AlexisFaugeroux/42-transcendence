import { buildApp } from './app';

const app = await buildApp();

app.listen({ host: '0.0.0.0', port: 8080 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
