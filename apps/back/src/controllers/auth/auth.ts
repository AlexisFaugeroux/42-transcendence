import type { FastifyReply, FastifyRequest } from 'fastify';
import { ConflictError, ForbiddenError, UnauthorizedError } from '../../domain/errors';
import { authCookieOptions } from '../../plugins/auth';
import { sampleRepository } from '../../repositories/sample/sample';
import { sessionRepository } from '../../repositories/session/session';
import { trackRepository } from '../../repositories/track/track';
import { userRepository } from '../../repositories/user/user';
import { hashPassword, verifyPassword } from '../../utils/password';
import { prisma } from '../../utils/prisma';
import { formatAuthUser } from './helpers';
import type { LoginRoute, MeRoute, RegisterRoute } from './types';

class AuthController {
  // Arrow-function property, NOT a method: Fastify binds a handler's `this` to the
  // FastifyInstance, so a plain method would lose `this`. An arrow property keeps
  // `this` bound to the controller while still being safe to pass as a callback.
  public register = async (
    req: FastifyRequest<RegisterRoute>,
    reply: FastifyReply<RegisterRoute>,
  ) => {
    const { artistName, email, firstname, handle, lastname, password, role } = req.body;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { artistName }, { handle }] },
    });
    if (existing) {
      throw new ConflictError('email, artistName or handle already in use');
    }

    const user = await prisma.user.create({
      data: {
        artistName,
        email,
        firstname,
        handle,
        lastname,
        owner: { create: { type: 'USER' } },
        password: await hashPassword(password),
        role,
      },
    });

    return reply.code(201).send({ user: formatAuthUser(user) });
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
    return reply.code(200).send({ user: formatAuthUser(user) });
  };

  public me = async (req: FastifyRequest, reply: FastifyReply<MeRoute>) => {
    const user = await prisma.user.findUnique({ where: { id: req.authUser.id } });
    if (!user) throw new UnauthorizedError();
    return reply.send({ user: formatAuthUser(user) });
  };

  public logout = async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.authUser.sid === null) throw new UnauthorizedError();
    await sessionRepository.revoke(req.authUser.sid);
    reply.clearCookie('token', { path: '/' });
    return reply.code(204).send();
  };

  public checkAccess = async (req: FastifyRequest, reply: FastifyReply) => {
    const originalUri = req.headers['x-original-uri'];
    if (typeof originalUri !== 'string') throw new ForbiddenError();

    const [path] = originalUri.split('?');
    const segments = path.split('/').filter(Boolean); // ['samples', ownerId, '<uuid>.<ext>']

    const audioFileType = segments[0];
    if (segments.length !== 3 || (audioFileType !== 'samples' && audioFileType !== 'tracks'))
      throw new ForbiddenError();

    const filename = segments[2];
    const dot = filename.lastIndexOf('.');
    if (dot <= 0) throw new ForbiddenError();

    const sampleId = filename.slice(0, dot);

    try {
      const { ownerId } = await userRepository.find({ id: req.authUser.id });
      const audioFile = await (
        audioFileType === 'samples' ? sampleRepository : trackRepository
      ).findById(sampleId);

      if (
        audioFile.visibility !== 'PUBLIC' &&
        audioFile.visibility !== 'SHARED' &&
        audioFile.ownerId !== ownerId
      )
        throw new ForbiddenError();
    } catch {
      throw new ForbiddenError();
    }

    reply.code(200).send();
  };
}

export const authController = new AuthController();
