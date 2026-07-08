import type { FastifyReply, FastifyRequest } from 'fastify';
import { ConflictError, UnauthorizedError } from '../domain/errors';
import { authCookieOptions } from '../plugins/auth';
import { sessionRepository } from '../repositories/session';
import { hashPassword, verifyPassword } from '../utils/password';
import { prisma } from '../utils/prisma';

interface RegisterBody {
  email: string;
  pseudo: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export class AuthController {
  // Arrow-function property, NOT a method: Fastify binds a handler's `this` to the
  // FastifyInstance, so a plain method would lose `this`. An arrow property keeps
  // `this` bound to the controller while still being safe to pass as a callback.
  public register = async (req: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
    const { email, password, pseudo } = req.body;
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { pseudo }] } });
    if (existing) {
      throw new ConflictError('email or pseudo already in use');
    }

    const user = await prisma.user.create({
      data: {
        email,
        owner: { create: { type: 'USER' } },
        password: await hashPassword(password),
        pseudo,
        role: 'ARTIST',
      },
    });

    return reply.code(201).send({ user: { email: user.email, id: user.id, pseudo: user.pseudo, role: user.role } });
  };

  public login = async (req: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.password))) {
      throw new UnauthorizedError();
    }
    const session = await sessionRepository.create(user.id, req.headers['user-agent']);
    const token = req.server.signAuthToken({ sid: session.id, sub: user.id });
    reply.setCookie('token', token, authCookieOptions());
    return reply.code(200).send({ user: { email: user.email, id: user.id, pseudo: user.pseudo, role: user.role } });
  };

  public me = async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await prisma.user.findUnique({ where: { id: req.authUser.id } });
    if (!user) throw new UnauthorizedError('unauthorized');
    return reply.send({ user: { email: user.email, id: user.id, pseudo: user.pseudo, role: user.role } });
  };

  public logout = async (req: FastifyRequest, reply: FastifyReply) => {
    await sessionRepository.revoke(req.authUser.sid);
    reply.clearCookie('token', { path: '/' });
    return reply.code(204).send();
  };
}

// Singleton shared by the route layer.
export const authController = new AuthController();
