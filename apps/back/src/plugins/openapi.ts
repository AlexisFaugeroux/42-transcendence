import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { API_KEY_HEADER } from '../utils/apiKey';

const TAGS = [
  { description: 'API keys of the authenticated account', name: 'api-keys' },
  { description: 'Registration, login and session', name: 'auth' },
  { description: 'Your own account and profile', name: 'user' },
  { description: 'Other producers and the follow graph', name: 'producers' },
  { description: 'Sample library', name: 'samples' },
  { description: 'Rendered exports', name: 'tracks' },
  { description: 'Studio project persistence', name: 'project' },
  { description: 'Direct messages', name: 'chat' },
  { description: 'Back-office: accounts, sessions, moderation', name: 'admin' },
];

async function openApiPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      components: {
        securitySchemes: {
          apiKey: {
            description:
              'An API key created from /api/keys/create, sent on every request. Carries exactly the permissions of the account that owns it.',
            in: 'header',
            name: API_KEY_HEADER,
            type: 'apiKey',
          },
          sessionCookie: {
            description: 'The session cookie set by /api/auth/login. Used by the web clients.',
            in: 'cookie',
            name: 'token',
            type: 'apiKey',
          },
        },
      },
      info: {
        description:
          'The MakeSomeNoise HTTP API. Most paths are RPC-style: the verb is in the path and identifiers travel in the querystring. /api/users is the exception and is REST-ish, because a handle is a public resource name.\n\nAuthentication is either the session cookie (web clients) or an API key in the x-api-key header (scripts and third parties). A key carries the permissions of its owner and nothing more; key management itself requires a session.',
        title: 'MakeSomeNoise API',
        version: '1.0.0',
      },
      openapi: '3.1.0',
      security: [{ apiKey: [] }, { sessionCookie: [] }],
      tags: TAGS,
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: { docExpansion: 'list', deepLinking: true },
  });
}

export default fp(openApiPlugin);
