import type { CreateTrackInput, GetTracksInput, Track, UpdateTrackInput } from '../../domain/track';
import type { PrismaClient, Track as PrismaTrack } from '../../generated/prisma/client';
import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';
import { buildFilters, formatTrack } from './helpers';

class TrackRepository {
  private readonly _prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this._prisma = client;
  }

  public async create(input: CreateTrackInput): Promise<Track> {
    try {
      const createdTrack: PrismaTrack = await this._prisma.track.create({
        data: input,
      });

      const formattedTrack = formatTrack(createdTrack);

      return formattedTrack;
    } catch (error: unknown) {
      throw mapError(error, 'Track');
    }
  }

  public async findById(id: string): Promise<Track> {
    try {
      const track: PrismaTrack = await this._prisma.track.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const formattedTrack = formatTrack(track);

      return formattedTrack;
    } catch (error: unknown) {
      throw mapError(error, 'Track');
    }
  }

  public async get(input: GetTracksInput & { viewerId: string }): Promise<Track[]> {
    const tracks = await this._prisma.track.findMany({
      include: { owner: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
      where: buildFilters(input),
    });

    const formattedTracks = tracks.map(({ owner, ...track }) => {
      let artistName: string | undefined, handle: string | undefined;

      if (owner.user) {
        ({ artistName, handle } = owner.user);
      }

      return {
        ...formatTrack(track),
        ...(owner.user && artistName && handle && { owner: { artistName, handle } }),
      };
    });

    return formattedTracks;
  }

  public async update(id: string, input: UpdateTrackInput): Promise<Track> {
    try {
      const updatedTrack = await this._prisma.track.update({
        data: input,
        where: { id },
      });

      const formattedTrack = formatTrack(updatedTrack);

      return formattedTrack;
    } catch (error: unknown) {
      throw mapError(error, 'Track');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this._prisma.track.delete({
        where: { id },
      });
    } catch (error: unknown) {
      throw mapError(error, 'Track');
    }
  }
}

export const trackRepository = new TrackRepository(prisma);
