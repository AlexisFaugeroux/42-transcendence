import type { PrismaClient, User as PrismaUser } from '../../src/generated/prisma/client';
import type { CreateUserInput, GetUserInput, UpdateUserInput, User } from '../domain/user';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

class UserRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async create(input: CreateUserInput): Promise<User> {
    try {
      const createdUser: PrismaUser = await this.prisma.$transaction(async (tx) => {
        const owner = await tx.owner.create({ data: { type: 'USER' } });

        return tx.user.create({
          data: {
            ...input,
            ownerId: owner.id,
            role: input.role ?? 'ARTIST',
          },
        });
      });

      const formattedUser = this._format(createdUser);

      return formattedUser;
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async findById(id: string): Promise<User> {
    try {
      const user: PrismaUser = await prisma.user.findUniqueOrThrow({
        where: { id },
      });

      const formattedUser = this._format(user);

      return formattedUser;
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const user: PrismaUser = await prisma.user.findUniqueOrThrow({
        where: { email },
      });

      const formattedUser = this._format(user);

      return formattedUser;
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async get(input: GetUserInput): Promise<User[]> {
    const filters = this._buildFilters(input);

    const where = Object.keys(filters).length ? filters : undefined;

    const users: PrismaUser[] = await this.prisma.user.findMany({
      where,
    });

    const formattedUsers = users.map((user) => this._format(user));

    return formattedUsers;
  }

  public async update(id: string, input: UpdateUserInput): Promise<User> {
    try {
      const updatedUser: PrismaUser = await this.prisma.user.update({
        data: input,
        where: { id },
      });

      const formattedUser = this._format(updatedUser);

      return formattedUser;
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  //TODO: ne pas oublier de supp les fichiers sur le serveur Nginx (a faire dans le controller)
  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.delete({ where: { id } });
        await tx.audioFile.deleteMany({ where: { ownerId: user.ownerId } });
        await tx.owner.delete({ where: { id: user.ownerId } });
      });
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  // Format prisma response (type User from PrismaClient) into domain type (type User from domain/)
  // because we do not keep every field from the User table in the database
  private _format(user: PrismaUser): User {
    const { createdAt, updatedAt, ...rest } = user;

    return rest;
  }

  private _buildFilters(input: GetUserInput) {
    const { emails, ids, roles } = input;

    const emailFilter = emails?.length ? { email: { in: emails } } : undefined;
    const idFilter = ids?.length ? { id: { in: ids } } : undefined;
    const roleFilter = roles?.length ? { role: { in: roles } } : undefined;

    return {
      ...emailFilter,
      ...idFilter,
      ...roleFilter,
    };
  }
}

export const userRepository = new UserRepository(prisma);
