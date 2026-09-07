import type { Permissions, Role } from '@transcendence/permissions';
import type { FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (
      permission: Permissions,
    ) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    signAuthToken: (payload: { sub: string; sid: string }) => string;
  }
  interface FastifyRequest {
    authUser: { id: string; role: Role; sid: string };
  }
}
