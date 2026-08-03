import { formatISO } from '@transcendence/date';
import type {
  AudioFile,
  CreateAudioFileInput,
  FamilyUsage,
  GetAudioFileInput,
  UpdateAudioFileInput,
} from '../domain/audioFile';
import type { AudioFile as PrismaAudioFile, PrismaClient } from '../generated/prisma/client';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

class AudioFileRepository {
  private readonly prisma: PrismaClient;

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

    return { ...rest, peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'), createdAt: formattedCreatedAt };
  }

  private _buildFilters(input: GetAudioFileInput) {
    const { bpms, families, ids, keys, kinds, modes, ownerIds, visibilities } = input;

    const idFilter = ids?.length ? { id: { in: ids } } : undefined;
    const bpmFilter = bpms?.length ? { bpm: { in: bpms } } : undefined;
    const keyFilter = keys?.length ? { key: { in: keys } } : undefined;
    const modeFilter = modes?.length ? { mode: { in: modes } } : undefined;
    const familyFilter = families?.length ? { family: { in: families } } : undefined;
    const kindFilter = kinds?.length ? { kind: { in: kinds } } : undefined;
    const visibilityFilter = visibilities?.length ? { visibility: { in: visibilities } } : undefined;
    const ownerIdFilter = ownerIds?.length ? { ownerId: { in: ownerIds } } : undefined;

    return {
      ...visibilityFilter,
      ...ownerIdFilter,
      ...idFilter,
      ...bpmFilter,
      ...keyFilter,
      ...modeFilter,
      ...familyFilter,
      ...kindFilter,
    };
  }
}

export const audioFileRepository = new AudioFileRepository(prisma);
