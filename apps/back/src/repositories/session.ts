import type { PrismaClient } from '../generated/prisma/client';
import type { Role } from '../generated/prisma/enums';
import { prisma } from '../utils/prisma';

export class SessionRepository {
  private readonly prisma: PrismaClient;
  public static readonly TTL_MS = 7 * 24 * 60 * 60 * 1000;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  public async create(
    userId: string,
    userAgent?: string,
  ): Promise<{ id: string; expiresAt: Date }> {
    const expiresAt = new Date(Date.now() + SessionRepository.TTL_MS);
    const session = await this.prisma.session.create({
      data: { expiresAt, userAgent, userId },
    });
    return { expiresAt: session.expiresAt, id: session.id };
  }

  public async findValid(
    sid: string,
  ): Promise<{ id: string; role: Role; userId: string } | null> {
    const session = await this.prisma.session.findUnique({
      include: { user: { select: { role: true } } },
      where: { id: sid },
    });
    if (!session) return null;
    if (session.revokedAt !== null) return null;
    if (session.expiresAt.getTime() <= Date.now()) return null;
    return { id: session.id, role: session.user.role, userId: session.userId };
  }

  public async revoke(sid: string): Promise<void> {
    await this.prisma.session.updateMany({
      data: { revokedAt: new Date() },
      where: { id: sid, revokedAt: null },
    });
  }

  public async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      data: { revokedAt: new Date() },
      where: { revokedAt: null, userId },
    });
  }
}

export const sessionRepository = new SessionRepository(prisma);
