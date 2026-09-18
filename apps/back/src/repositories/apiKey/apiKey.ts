import { formatISO } from '@transcendence/date';
import type { ApiKey, CreatedApiKey } from '../../domain/apiKey';
import type { ApiKey as PrismaApiKey, PrismaClient } from '../../generated/prisma/client';
import type { Role } from '../../generated/prisma/enums';
import { generateApiKey, verifyApiKey } from '../../utils/apiKey';
import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';

export interface ResolvedApiKey {
  id: string;
  userId: string;
  role: Role;
}

export class ApiKeyRepository {
  private readonly prisma: PrismaClient;
  public static readonly MAX_PER_USER = 10;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  public async create(
    userId: string,
    name: string,
    expiresInDays?: number,
  ): Promise<CreatedApiKey> {
    const { hash, key, prefix } = generateApiKey();
    const expiresAt =
      expiresInDays === undefined
        ? null
        : new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

    try {
      const row = await this.prisma.apiKey.create({
        data: { expiresAt, hash, name, prefix, userId },
      });

      return { ...this._format(row), key };
    } catch (error) {
      throw mapError(error, 'ApiKey');
    }
  }

  public async countActiveForUser(userId: string): Promise<number> {
    return this.prisma.apiKey.count({ where: { revokedAt: null, userId } });
  }

  public async listForUser(userId: string): Promise<{ items: ApiKey[]; total: number }> {
    const where = { revokedAt: null, userId };

    const [rows, total] = await Promise.all([
      this.prisma.apiKey.findMany({ orderBy: { createdAt: 'desc' }, where }),
      this.prisma.apiKey.count({ where }),
    ]);

    return { items: rows.map((row) => this._format(row)), total };
  }

  public async resolve(key: string, prefix: string): Promise<ResolvedApiKey | null> {
    const row = await this.prisma.apiKey.findUnique({
      include: { user: { select: { role: true } } },
      where: { prefix },
    });

    if (!row) return null;
    if (row.revokedAt !== null) return null;
    if (row.expiresAt !== null && row.expiresAt.getTime() <= Date.now()) return null;
    if (!verifyApiKey(key, row.hash)) return null;

    return { id: row.id, role: row.user.role, userId: row.userId };
  }

  public async revoke(id: string, userId: string): Promise<number> {
    const { count } = await this.prisma.apiKey.updateMany({
      data: { revokedAt: new Date() },
      where: { id, revokedAt: null, userId },
    });

    return count;
  }

  public async touch(id: string): Promise<void> {
    await this.prisma.apiKey.updateMany({
      data: { lastUsedAt: new Date() },
      where: { id },
    });
  }

  private _format(row: PrismaApiKey): ApiKey {
    return {
      createdAt: formatISO(row.createdAt),
      expiresAt: row.expiresAt === null ? null : formatISO(row.expiresAt),
      id: row.id,
      lastUsedAt: row.lastUsedAt === null ? null : formatISO(row.lastUsedAt),
      name: row.name,
      prefix: row.prefix,
    };
  }
}

export const apiKeyRepository = new ApiKeyRepository(prisma);
