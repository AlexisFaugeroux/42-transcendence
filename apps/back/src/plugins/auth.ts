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
import { SessionRepository, sessionRepository } from '../repositories/session/session';

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
        req.authUser = { id: session.userId, role: session.role, sid: session.id };
      }
    } catch {
      req.log.debug(error, 'no valid session, rate limiting by ip');
    }
  });

  await app.register(rateLimit, {
    global: false,
    hook: 'preHandler',
    keyGenerator: (req) => req.authUser?.id ?? req.ip,
  });

  app.decorate(
    'signAuthToken',
    function (this: FastifyInstance, payload: { sub: string; sid: string }) {
      return this.jwt.sign(payload);
    },
  );

  app.decorate('authenticate', async function (req: FastifyRequest, reply: FastifyReply) {
    if (!req.authUser) reply.code(401).send({ message: 'unauthorized' });
  });

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
