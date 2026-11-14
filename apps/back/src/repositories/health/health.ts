import type { PrismaClient } from '../../generated/prisma/client';
import { prisma } from '../../utils/prisma';

export class HealthRepository {
  private readonly prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  public async ping(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }
}

export const healthRepository = new HealthRepository(prisma);
