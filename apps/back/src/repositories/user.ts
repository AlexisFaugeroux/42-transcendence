import type { PrismaClient, User as PrismaUser } from '../../src/generated/prisma/client';
import type { JsonValue } from '../../src/generated/prisma/internal/prismaNamespace';
import type {
  CreateUserInput,
  GetUserInput,
  PublicProducer,
  PublicProducerProfile,
  UpdateUserInput,
  User,
} from '../domain/user';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

// A `Json?` column comes back as untyped JsonValue. `links` is stored as an
// array of { kind, url } entries; narrow it here (dropping anything that
// doesn't fit) rather than asserting the shape blindly.
export function toLinks(value: JsonValue | null): { kind: string; url: string }[] | null {
  if (!Array.isArray(value)) return null;
  const links: { kind: string; url: string }[] = [];
  for (const entry of value) {
    if (
      entry !== null &&
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      typeof entry.kind === 'string' &&
      typeof entry.url === 'string'
    ) {
      links.push({ kind: entry.kind, url: entry.url });
    }
  }
  return links;
}

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

  public async listPublic(
    skip: number,
    take: number,
  ): Promise<{ items: PublicProducer[]; total: number }> {
    try {
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          orderBy: {
            artistName: 'asc',
          },
          skip,
          take,
        }),
        this.prisma.user.count(),
      ]);

      return {
        items: users.map((user: PrismaUser) => this._formatPublic(user)),
        total,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async findProfileByHandle(
    handle: string,
    viewerId: string,
  ): Promise<PublicProducerProfile> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { handle },
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
        ...this._formatPublic(user),
        followersCount: user._count.followedBy,
        followingCount: user._count.following,
        isFollowing: user.followedBy.length > 0,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowers(
    handle: string,
    skip: number,
    take: number,
  ): Promise<{ items: PublicProducer[]; total: number }> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { handle },
        include: {
          followedBy: {
            orderBy: { artistName: 'asc' },
            skip,
            take,
          },
          _count: {
            select: { followedBy: true },
          },
        },
      });

      return {
        items: user.followedBy.map((follower: PrismaUser) => this._formatPublic(follower)),
        total: user._count.followedBy,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowing(
    handle: string,
    skip: number,
    take: number,
  ): Promise<{ items: PublicProducer[]; total: number }> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { handle },
        include: {
          following: {
            orderBy: {
              artistName: 'asc',
            },
            skip,
            take,
          },
          _count: {
            select: {
              following: true,
            },
          },
        },
      });

      return {
        items: user.following.map((followed: PrismaUser) => this._formatPublic(followed)),
        total: user._count.following,
      };
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowingIdsByUserId(userId: string): Promise<string[]> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        select: {
          following: {
            select: {
              id: true,
            },
          },
        },
        where: { id: userId },
      });

      return user.following.map((followed) => followed.id);
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
  }

  public async listFollowerIdsByUserId(userId: string): Promise<string[]> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        select: {
          followedBy: {
            select: {
              id: true,
            },
          },
        },
        where: { id: userId },
      });

      return user.followedBy.map((follower) => follower.id);
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
    const { avatarUpdatedAt, bio, createdAt, links, location, updatedAt, ...rest } = user;

    return {
      ...rest,
      avatarUpdatedAt: avatarUpdatedAt ? avatarUpdatedAt.toISOString() : null,
      bio: bio ?? undefined,
      links: toLinks(links),
      location: location ?? undefined,
    };
  }

  private _formatPublic(user: PrismaUser): PublicProducer {
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
}

export const userRepository = new UserRepository(prisma);
