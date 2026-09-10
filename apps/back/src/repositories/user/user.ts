import type {
  CreateUserInput,
  GetUserInput,
  Producer,
  ProducerProfile,
  UpdateUserInput,
  User,
  UserWithPassword,
} from '../../domain/user';
import type { PrismaClient, User as PrismaUser } from '../../generated/prisma/client';
import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';
import { toLinks } from './helpers';
import type { FollowListOptions, UniqueRef } from './types';

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

  public async find(ref: UniqueRef): Promise<User> {
    try {
      const user: PrismaUser = await this.prisma.user.findUniqueOrThrow({
        where: ref,
      });

      const formattedUser = this._format(user);

      return formattedUser;
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async findWithPassword(ref: UniqueRef): Promise<UserWithPassword> {
    try {
      const user: PrismaUser = await prisma.user.findUniqueOrThrow({
        where: ref,
      });

      const formattedUser = this._formatUserWithPassword(user);

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

  public async listPublic(
    skip?: number,
    take?: number,
    q?: string,
  ): Promise<{ items: Producer[]; total: number }> {
    try {
      const where = this._publicSearchWhere(q);

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          orderBy: {
            artistName: 'asc',
          },
          ...(take !== undefined ? { skip, take } : {}),
        }),
        this.prisma.user.count({ where }),
      ]);

      return {
        items: users.map((user: PrismaUser) => this._formatProducer(user)),
        total,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowers(
    ref: UniqueRef,
    options: FollowListOptions = {},
  ): Promise<{ items: Producer[]; total: number }> {
    try {
      const where = this._publicSearchWhere(options.q);

      const user = await this.prisma.user.findUniqueOrThrow({
        where: ref,
        include: {
          followedBy: {
            where,
            orderBy: { artistName: 'asc' },
            ...(options.take !== undefined ? { skip: options.skip, take: options.take } : {}),
          },
          _count: {
            select: {
              followedBy: where ? { where } : true,
            },
          },
        },
      });

      return {
        items: user.followedBy.map((follower: PrismaUser) => this._formatProducer(follower)),
        total: user._count.followedBy,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowing(
    ref: UniqueRef,
    options: FollowListOptions = {},
  ): Promise<{ items: Producer[]; total: number }> {
    try {
      const where = this._publicSearchWhere(options.q);

      const user = await this.prisma.user.findUniqueOrThrow({
        where: ref,
        include: {
          following: {
            where,
            orderBy: {
              artistName: 'asc',
            },
            ...(options.take !== undefined ? { skip: options.skip, take: options.take } : {}),
          },
          _count: {
            select: {
              following: where ? { where } : true,
            },
          },
        },
      });

      return {
        items: user.following.map((followed: PrismaUser) => this._formatProducer(followed)),
        total: user._count.following,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async findProfile(ref: UniqueRef, viewerId: string): Promise<ProducerProfile> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: ref,
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },

          followedBy: {
            select: {
              id: true,
            },
            where: { id: viewerId },
          },
        },
      });

      return {
        ...this._formatProducer(user),
        followersCount: user._count.followedBy,
        followingCount: user._count.following,
        isFollowing: user.followedBy.length > 0,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async follow(followerId: string, targetId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        data: {
          following: {
            connect: { id: targetId },
          },
        },
        where: { id: followerId },
      });
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async unfollow(followerId: string, targetId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        data: {
          following: {
            disconnect: { id: targetId },
          },
        },
        where: { id: followerId },
      });
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
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

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.delete({ where: { id } });
        await tx.sample.deleteMany({ where: { ownerId: user.ownerId } });
        await tx.owner.delete({ where: { id: user.ownerId } });
      });
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  // Format prisma response (type User from PrismaClient) into domain type (type User from domain/)
  // because we do not keep every field from the User table in the database
  private _format(user: PrismaUser): User {
    const {
      avatarUpdatedAt,
      bio,
      createdAt,
      links,
      location,
      password: _password,
      updatedAt,
      ...rest
    } = user;

    return {
      ...rest,
      avatarUpdatedAt: avatarUpdatedAt ? avatarUpdatedAt.toISOString() : null,
      bio: bio ?? undefined,
      links: toLinks(links),
      location: location ?? undefined,
      joined: createdAt,
    };
  }

  private _formatUserWithPassword(user: PrismaUser): UserWithPassword {
    return {
      ...this._format(user),
      password: user.password,
    };
  }

  private _formatProducer(user: PrismaUser): Producer {
    return {
      artistName: user.artistName,
      bio: user.bio ?? undefined,
      handle: user.handle,
      id: user.id,
      joined: user.createdAt,
      links: toLinks(user.links),
      location: user.location ?? undefined,
      role: user.role,
    };
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

  private _publicSearchWhere(q?: string) {
    const search = q?.trim();
    if (search)
      return {
        OR: [
          { handle: { contains: search, mode: 'insensitive' as const } },
          { artistName: { contains: search, mode: 'insensitive' as const } },
        ],
      };
  }
}

export const userRepository = new UserRepository(prisma);
