import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { can, type Permissions } from '@transcendence/permissions';
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import fp from 'fastify-plugin';
import { ForbiddenError } from '../domain/errors';
import { apiKeyRepository } from '../repositories/apiKey/apiKey';
import { SessionRepository, sessionRepository } from '../repositories/session/session';
import { API_KEY_HEADER, readKeyPrefix } from '../utils/apiKey';

export function authCookieOptions() {
  return {
    httpOnly: true,
    maxAge: Math.floor(SessionRepository.TTL_MS / 1000),
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

async function authPlugin(app: FastifyInstance) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  await app.register(cookie);
  await app.register(jwt, {
    cookie: { cookieName: 'token', signed: false },
    secret,
    sign: { expiresIn: '7d' },
  });
  app.addHook('onRequest', async (req) => {
    try {
      const payload = await req.jwtVerify<{ sub: string; sid: string }>();
      const session = await sessionRepository.findValid(payload.sid);
      if (session) {
        req.authUser = {
          apiKeyId: null,
          id: session.userId,
          role: session.role,
          sid: session.id,
        };
        return;
      }
    } catch (error) {
      req.log.debug(error, 'no valid session, trying the API key header');
    }

    const header = req.headers[API_KEY_HEADER];
    if (typeof header !== 'string') return;

    const prefix = readKeyPrefix(header);
    if (prefix === null) return;

    const apiKey = await apiKeyRepository.resolve(header, prefix);
    if (!apiKey) {
      req.log.debug('no valid API key, rate limiting by ip');
      return;
    }

    req.authUser = { apiKeyId: apiKey.id, id: apiKey.userId, role: apiKey.role, sid: null };

    void apiKeyRepository.touch(apiKey.id).catch((error: unknown) => {
      req.log.warn(error, 'could not record API key usage');
    });
  });

  await app.register(rateLimit, {
    global: false,
    hook: 'preHandler',
    keyGenerator: (req) => req.authUser?.apiKeyId ?? req.authUser?.id ?? req.ip,
  });

  app.decorate(
    'signAuthToken',
    function (this: FastifyInstance, payload: { sub: string; sid: string }) {
      return this.jwt.sign(payload);
    },
  );

  app.decorate(
    'authenticate',
    function (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
      if (!req.authUser) {
        reply.code(401).send({ message: 'unauthorized' });
        return;
      }
      done();
    },
  );

  app.decorate(
    'authenticateSession',
    function (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
      if (!req.authUser?.sid) {
        reply.code(401).send({ message: 'unauthorized' });
        return;
      }
      done();
    },
  );

  app.decorate('authorize', (permission: Permissions) => {
    return function authorize(
      req: FastifyRequest,
      _reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) {
      if (!can(req.authUser.role, permission)) {
        done(new ForbiddenError());
        return;
      }
      done();
    };
  });
}

export default fp(authPlugin);
