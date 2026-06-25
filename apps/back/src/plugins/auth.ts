import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { SessionRepository, sessionRepository } from '../repositories/session';

export function authCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(SessionRepository.TTL_MS / 1000),
  };
}

async function authPlugin(app: FastifyInstance) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  await app.register(cookie);
  await app.register(jwt, {
    secret,
    cookie: { cookieName: 'token', signed: false },
    sign: { expiresIn: '7d' },
  });
  // global: false → only routes that opt in via `config.rateLimit` are limited,
  // so auth endpoints are throttled while everything else is untouched.
  await app.register(rateLimit, { global: false });

  app.decorate('signAuthToken', function (this: FastifyInstance, payload: { sub: string; sid: string }) {
    return this.jwt.sign(payload);
  });

  app.decorate('authenticate', async function (req: FastifyRequest, reply: FastifyReply) {
    try {
      const payload = await req.jwtVerify<{ sub: string; sid: string }>();
      const session = await sessionRepository.findValid(payload.sid);
      if (!session) {
        await reply.code(401).send({ error: 'unauthorized' });
        return;
      }
      req.authUser = { id: payload.sub, sid: payload.sid };
    } catch {
      await reply.code(401).send({ error: 'unauthorized' });
    }
  });
}

export default fp(authPlugin);