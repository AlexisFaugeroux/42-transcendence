import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import type { AuthResponse, AuthUser, LoginBody, RegisterBody } from '../domain/auth';
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from '../domain/errors';
import type { User } from '../generated/prisma/client';
import { authCookieOptions } from '../plugins/auth';
import { audioFileRepository } from '../repositories/audioFile';
import { userRepository } from '../repositories/user';
import { sessionRepository } from '../repositories/session';
import { toLinks } from '../repositories/user';
import { hashPassword, verifyPassword } from '../utils/password';
import { prisma } from '../utils/prisma';

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

class AuthController {
  // Arrow-function property, NOT a method: Fastify binds a handler's `this` to the
  // FastifyInstance, so a plain method would lose `this`. An arrow property keeps
  // `this` bound to the controller while still being safe to pass as a callback.
  public register = async (req: FastifyRequest<RegisterRoute>, reply: FastifyReply<RegisterRoute>) => {
    const { artistName, email, firstname, handle, lastname, password } = req.body;
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { artistName }, { handle }] } });
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
        role: 'ARTIST',
      },
    });

    return reply.code(201).send({ user: this._format(user) });
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
    return reply.code(200).send({ user: this._format(user) });
  };

  public me = async (req: FastifyRequest, reply: FastifyReply<MeRoute>) => {
    const user = await prisma.user.findUnique({ where: { id: req.authUser.id } });
    if (!user) throw new UnauthorizedError();
    return reply.send({ user: this._format(user) });
  };

  public logout = async (req: FastifyRequest, reply: FastifyReply) => {
    await sessionRepository.revoke(req.authUser.sid);
    reply.clearCookie('token', { path: '/' });
    return reply.code(204).send();
  };

  public checkAccess = async (req: FastifyRequest, reply: FastifyReply) => {
    const originalString = req.headers['x-original-uri']
    if (!originalString || Array.isArray(originalString))
    { 
      reply.code(400).send();
      return ;
    }
    const queryParser = new URLSearchParams( originalString.substring( originalString.indexOf('?'), originalString.length ) );
    const sampleId = queryParser.get('sampleId');
    const userId = queryParser.get('userId');
    if ( !userId )
    {
      reply.code(400).send();
      return ;
    }
    const ownerId = (await userRepository.findById( userId )).ownerId;
    if (!sampleId)
    {
      reply.code(400).send();
      return ;
    }
    const sample = await audioFileRepository.findById(sampleId);
    if (!sample) throw new NotFoundError();
     if (sample.visibility != 'PUBLIC' && sample.visibility != 'SHARED' && sample.ownerId != ownerId)
       throw new ForbiddenError();
    reply.code(200).send();
  };

  private _format(user: User): AuthUser {
    return {
      artistName: user.artistName,
      bio: user.bio ?? undefined,
      email: user.email,
      firstname: user.firstname,
      handle: user.handle,
      id: user.id,
      joined: user.createdAt,
      lastname: user.lastname,
      links: toLinks(user.links),
      location: user.location ?? undefined,
      role: user.role,
    };
  }
}

// Singleton shared by the route layer.
export const authController = new AuthController();
