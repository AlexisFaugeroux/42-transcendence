import { formatISO } from '@transcendence/date';
import type {
  CreateSampleInput,
  FamilyUsage,
  GetSampleInput,
  Sample,
  UpdateSampleInput,
  Visibility,
} from '../domain/sample';
import type { PrismaClient, Sample as PrismaSample, OwnerType } from '../generated/prisma/client';
import type { SampleWhereInput } from '../generated/prisma/models';
import { prisma } from '../utils/prisma';
import { inFilter, mapError } from './helpers';

class SampleRepository {
  private readonly prisma: PrismaClient;
  private readonly OTHERS_VISIBILITIES: Visibility[] = ['PUBLIC', 'SHARED'];

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async create(input: CreateSampleInput): Promise<Sample> {
    try {
      const createdSample: PrismaSample = await this.prisma.sample.create({
        data: input,
      });

      const formattedSample = this._format(createdSample);

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

      const formattedSample = this._format(sample);

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
    const filters = this._buildFilters(input);
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
      ...this._format({ ...sample }),
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

      const formattedSample = this._format(updatedSample);

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

  private _format(sample: PrismaSample): Sample {
    const { createdAt, updatedAt, ...rest } = sample;

    const formattedCreatedAt = formatISO(createdAt);

    return {
      ...rest,
      createdAt: formattedCreatedAt,
      peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'),
    };
  }

  private _criteriaFilter(input: GetSampleInput): SampleWhereInput {
    const { bpms, families, ids, keys, kinds, modes } = input;

    return {
      bpm: inFilter(bpms),
      family: inFilter(families),
      id: inFilter(ids),
      key: inFilter(keys),
      kind: inFilter(kinds),
      mode: inFilter(modes),
    };
  }

  private _scopeFilter(input: GetSampleInput): SampleWhereInput {
    const { ownerIds, visibilities } = input;

    const visibility = inFilter(visibilities);

    if (!ownerIds?.length) {
      return { visibility };
    }

    const mine: SampleWhereInput = { ownerId: { in: ownerIds }, visibility };

    const othersVisibilities = visibilities?.length
      ? visibilities.filter((v) => this.OTHERS_VISIBILITIES.includes(v))
      : this.OTHERS_VISIBILITIES;

    if (!othersVisibilities.length) {
      return mine;
    }

    return {
      OR: [mine, { ownerId: { notIn: ownerIds }, visibility: { in: othersVisibilities } }],
    };
  }

  private _buildFilters(input: GetSampleInput): SampleWhereInput {
    return {
      ...this._criteriaFilter(input),
      ...this._scopeFilter(input),
    };
  }
}

export const sampleRepository = new SampleRepository(prisma);
