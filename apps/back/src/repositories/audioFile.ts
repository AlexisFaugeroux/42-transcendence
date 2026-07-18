import type { AudioFile, CreateAudioFileInput, GetAudioFileInput, UpdateAudioFileInput } from '../domain/audioFile';
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

  private _format(audioFile: PrismaAudioFile) {
    const { createdAt, updatedAt, ...rest } = audioFile;

    return rest;
  }

  private _buildFilters(input: GetAudioFileInput) {
    const { bpms, ids, keys, ownerIds, visibilities } = input;

    const idFilter = ids?.length ? { id: { in: ids } } : undefined;
    const bpmFilter = bpms?.length ? { bpm: { in: bpms } } : undefined;
    const keyFilter = keys?.length ? { Key: { in: keys } } : undefined;
    const visibilityFilter = visibilities?.length ? { visibility: { in: visibilities } } : undefined;
    const ownerIdFilter = ownerIds?.length ? { ownerId: { in: ownerIds } } : undefined;

    return {
      ...visibilityFilter,
      ...ownerIdFilter,
      ...idFilter,
      ...bpmFilter,
      ...keyFilter,
    };
  }
}

export const audioFileRepository = new AudioFileRepository(prisma);
