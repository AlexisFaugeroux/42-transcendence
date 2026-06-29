import type { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    signAuthToken: (payload: { sub: string; sid: string }) => string;
  }
  interface FastifyRequest {
    authUser: { id: string; sid: string };
  }
}
