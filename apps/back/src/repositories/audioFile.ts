import { formatISO } from '@transcendence/date';
import type {
  AudioFile,
  CreateAudioFileInput,
  FamilyUsage,
  GetAudioFileInput,
  UpdateAudioFileInput,
  Visibility,
} from '../domain/audioFile';
import type { AudioFile as PrismaAudioFile, PrismaClient } from '../generated/prisma/client';
import type { AudioFileWhereInput } from '../generated/prisma/models';
import { prisma } from '../utils/prisma';
import { inFilter, mapError } from './helpers';

class AudioFileRepository {
  private readonly prisma: PrismaClient;
  private readonly OTHERS_VISIBILITIES: Visibility[] = ['PUBLIC', 'SHARED'];

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async create(input: CreateAudioFileInput): Promise<AudioFile> {
    try {
      const createdAudioFile: PrismaAudioFile = await this.prisma.audioFile.create({
        data: input,
      });

      const formattedAudioFile = this._format(createdAudioFile);

      return formattedAudioFile;
    } catch (error: unknown) {
      throw mapError(error, 'AudioFile');
    }
  }

  public async findById(id: string): Promise<AudioFile> {
    try {
      const audioFile: PrismaAudioFile = await this.prisma.audioFile.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const formattedAudioFile = this._format(audioFile);

      return formattedAudioFile;
    } catch (error: unknown) {
      throw mapError(error, 'AudioFile');
    }
  }

  public async get(input: GetAudioFileInput): Promise<AudioFile[]> {
    const filters = this._buildFilters(input);

    const where = Object.keys(filters).length ? filters : undefined;

    const audioFiles: PrismaAudioFile[] = await this.prisma.audioFile.findMany({
      where,
    });

    const formattedAudioFiles = audioFiles.map((audioFile) => this._format(audioFile));

    return formattedAudioFiles;
  }

  public async update(id: string, input: UpdateAudioFileInput): Promise<AudioFile> {
    try {
      const updatedAudioFile = await this.prisma.audioFile.update({
        data: input,
        where: { id },
      });

      const formattedAudioFile = this._format(updatedAudioFile);

      return formattedAudioFile;
    } catch (error: unknown) {
      throw mapError(error, 'AudioFile');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.audioFile.delete({
        where: { id },
      });
    } catch (error: unknown) {
      throw mapError(error, 'AudioFile');
    }
  }

  public async sumBytes(ownerId: string): Promise<number> {
    const result = await prisma.audioFile.aggregate({
      _sum: { bytes: true },
      where: { ownerId },
    });

    return result._sum.bytes ?? 0;
  }

  public async sumBytesByFamily(ownerId: string): Promise<FamilyUsage[]> {
    const rows = await this.prisma.audioFile.groupBy({
      _sum: { bytes: true },
      by: ['family'],
      where: { ownerId },
    });

    return rows.map((row) => ({ bytes: row._sum.bytes ?? 0, family: row.family }));
  }

  private _format(audioFile: PrismaAudioFile): AudioFile {
    const { createdAt, updatedAt, ...rest } = audioFile;

    const formattedCreatedAt = formatISO(createdAt);

    return {
      ...rest,
      createdAt: formattedCreatedAt,
      peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'),
    };
  }

  private _criteriaFilter(input: GetAudioFileInput): AudioFileWhereInput {
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

  private _scopeFilter(input: GetAudioFileInput): AudioFileWhereInput {
    const { ownerIds, visibilities } = input;

    const visibility = inFilter(visibilities);

    if (!ownerIds?.length) {
      return { visibility };
    }

    const mine: AudioFileWhereInput = { ownerId: { in: ownerIds }, visibility };

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

  private _buildFilters(input: GetAudioFileInput): AudioFileWhereInput {
    return {
      ...this._criteriaFilter(input),
      ...this._scopeFilter(input),
    };
  }
}

export const audioFileRepository = new AudioFileRepository(prisma);
