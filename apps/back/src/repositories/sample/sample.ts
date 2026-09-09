import type {
  CreateSampleInput,
  FamilyUsage,
  GetSampleInput,
  Sample,
  UpdateSampleInput,
} from '../../domain/sample';
import type {
  PrismaClient,
  Sample as PrismaSample,
  OwnerType,
} from '../../generated/prisma/client';

import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';
import { buildFilters, formatSample } from './helpers';

class SampleRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async create(input: CreateSampleInput): Promise<Sample> {
    try {
      const createdSample: PrismaSample = await this.prisma.sample.create({
        data: input,
      });

      const formattedSample = formatSample(createdSample);

      return formattedSample;
    } catch (error: unknown) {
      throw mapError(error, 'Sample');
    }
  }

  public async findById(id: string): Promise<Sample> {
    try {
      const sample: PrismaSample = await this.prisma.sample.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const formattedSample = formatSample(sample);

      return formattedSample;
    } catch (error: unknown) {
      throw mapError(error, 'Sample');
    }
  }

  public async get(
    input: GetSampleInput,
    skip?: number,
    take?: number,
    q?: string,
  ): Promise<{ items: (Sample & { ownerType: OwnerType })[]; total: number }> {
    const filters = buildFilters(input);
    const search = q?.trim();

    const where = {
      ...filters,
      ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}),
    };

    const whereInput = Object.keys(where).length ? where : undefined;

    const [samples, total] = await Promise.all([
      this.prisma.sample.findMany({
        where: whereInput,
        ...(take !== undefined ? { skip, take } : {}),
        orderBy: { createdAt: 'desc' },
        include: { owner: { select: { type: true } } },
      }),
      this.prisma.sample.count({
        where: whereInput,
      }),
    ]);

    const formattedSamples = samples.map((sample) => ({
      ...formatSample({ ...sample }),
      ownerType: sample.owner.type,
    }));
    return { items: formattedSamples, total };
  }

  public async update(id: string, input: UpdateSampleInput): Promise<Sample> {
    try {
      const updatedSample = await this.prisma.sample.update({
        data: input,
        where: { id },
      });

      const formattedSample = formatSample(updatedSample);

      return formattedSample;
    } catch (error: unknown) {
      throw mapError(error, 'Sample');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.sample.delete({
        where: { id },
      });
    } catch (error: unknown) {
      throw mapError(error, 'Sample');
    }
  }

  public async sumBytes(ownerId: string): Promise<number> {
    const result = await prisma.sample.aggregate({
      _sum: { bytes: true },
      where: { ownerId },
    });

    return result._sum.bytes ?? 0;
  }

  public async sumBytesByFamily(ownerId: string): Promise<FamilyUsage[]> {
    const rows = await this.prisma.sample.groupBy({
      _sum: { bytes: true },
      by: ['family'],
      where: { ownerId },
    });

    return rows.map((row) => ({ bytes: row._sum.bytes ?? 0, family: row.family }));
  }
}

export const sampleRepository = new SampleRepository(prisma);
