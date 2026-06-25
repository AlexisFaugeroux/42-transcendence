import { prisma } from '../utils/prisma';

export class SessionService {
  public static readonly TTL_MS = 7 * 24 * 60 * 60 * 1000;

  public async create(userId: string, userAgent?: string): Promise<{ id: string; expiresAt: Date }> {
    const expiresAt = new Date(Date.now() + SessionService.TTL_MS);
    const session = await prisma.session.create({
      data: { userId, expiresAt, userAgent },
    });
    return { id: session.id, expiresAt: session.expiresAt };
  }

  public async findValid(sid: string): Promise<{ id: string; userId: string } | null> {
    const session = await prisma.session.findUnique({ where: { id: sid } });
    if (!session) return null;
    if (session.revokedAt !== null) return null;
    if (session.expiresAt.getTime() <= Date.now()) return null;
    return { id: session.id, userId: session.userId };
  }

  public async revoke(sid: string): Promise<void> {
    await prisma.session.updateMany({
      where: { id: sid, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}

// Singleton shared across the app — import this, don't `new` it per call site.
export const sessionService = new SessionService();