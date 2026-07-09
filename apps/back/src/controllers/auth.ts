import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from '../domain/errors';
import { authCookieOptions } from '../plugins/auth';
import { audioFileRepository } from '../repositories/audioFile';
import { sessionRepository } from '../repositories/session';
import { hashPassword, verifyPassword } from '../utils/password';
import { prisma } from '../utils/prisma';
import type { AuthResponse, LoginBody, RegisterBody } from '../domain/auth';

interface CheckAccessRoute extends RouteGenericInterface {
  Querystring: {
    ownerId: string;
    sampleId: string;
  };
}

interface RegisterRoute extends RouteGenericInterface {
  Body: RegisterBody;
  Reply: AuthResponse;
}

interface LoginRoute extends RouteGenericInterface {
  Body: LoginBody;
  Reply: AuthResponse;
}

interface MeRoute extends RouteGenericInterface {
  Reply: AuthResponse;
}

export class AuthController {
  // Arrow-function property, NOT a method: Fastify binds a handler's `this` to the
  // FastifyInstance, so a plain method would lose `this`. An arrow property keeps
  // `this` bound to the controller while still being safe to pass as a callback.
  public register = async (req: FastifyRequest<RegisterRoute>, reply: FastifyReply<RegisterRoute>) => {
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

  public login = async (req: FastifyRequest<LoginRoute>, reply: FastifyReply<LoginRoute>) => {
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

  public me = async (req: FastifyRequest, reply: FastifyReply<MeRoute>) => {
    const user = await prisma.user.findUnique({ where: { id: req.authUser.id } });
    if (!user) throw new UnauthorizedError();
    return reply.send({ user: { email: user.email, id: user.id, pseudo: user.pseudo, role: user.role } });
  };

  public logout = async (req: FastifyRequest, reply: FastifyReply) => {
    await sessionRepository.revoke(req.authUser.sid);
    reply.clearCookie('token', { path: '/' });
    return reply.code(204).send();
  };

  public checkAccess = async (req: FastifyRequest<CheckAccessRoute>, reply: FastifyReply) => {
    const { ownerId, sampleId } = req.query;
    const sample = await audioFileRepository.findById(sampleId);
    if (!sample) throw new NotFoundError();
    if (sample.visibility != 'PUBLIC' && sample.visibility != 'SHARED' && sample.ownerId != ownerId)
      throw new ForbiddenError();
    reply.code(200).send();
  };
}

// Singleton shared by the route layer.
export const authController = new AuthController();
