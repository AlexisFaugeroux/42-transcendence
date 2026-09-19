import type { FastifyReply, HookHandlerDoneFunction } from 'fastify';
import type { Permissions, Role } from '@transcendence/permissions';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => void;
    authenticateSession: (
      req: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => void;
    authorize: (
      permission: Permissions,
    ) => (req: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction) => void;
    signAuthToken: (payload: { sub: string; sid: string }) => string;
  }
  interface FastifyRequest {
    authUser: { id: string; role: Role; sid: string | null; apiKeyId: string | null };
  }
}
