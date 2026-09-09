import type { Permissions, Role } from '@transcendence/permissions';
import type { FastifyReply, HookHandlerDoneFunction } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (
      permission: Permissions,
    ) => (req: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction) => void;
    signAuthToken: (payload: { sub: string; sid: string }) => string;
  }
  interface FastifyRequest {
    authUser: { id: string; role: Role; sid: string };
  }
}
