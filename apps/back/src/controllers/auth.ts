import type { FastifyReply, FastifyRequest } from 'fastify';
import { hashPassword } from '../utils/password';
import { prisma } from '../utils/prisma';


interface RegisterBody {
  email: string;
  pseudo: string;
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
      return reply.code(409).send({ error: 'email or pseudo already in use' });
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
}

// Singleton shared by the route layer.
export const authController = new AuthController();
