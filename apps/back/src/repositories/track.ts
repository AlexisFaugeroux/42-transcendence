import { formatISO } from '@transcendence/date';
import type { CreateTrackInput, GetTracksInput, Track, UpdateTrackInput } from '../domain/track';
import type { PrismaClient, Track as PrismaTrack } from '../generated/prisma/client';
import type { TrackWhereInput } from '../generated/prisma/models';
import { prisma } from '../utils/prisma';
import { inFilter, mapError } from './helpers';

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

      const formattedTrack = this._format(createdTrack);

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

      const formattedTrack = this._format(track);

      return formattedTrack;
    } catch (error: unknown) {
      throw mapError(error, 'Track');
    }
  }

  public async get(input: GetTracksInput & { viewerId: string }): Promise<Track[]> {
    const tracks = await this._prisma.track.findMany({
      include: { owner: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
      where: this._buildFilters(input),
    });

    const formattedTracks = tracks.map(({ owner, ...track }) => {
      let artistName: string | undefined, handle: string | undefined;

      if (owner.user) {
        ({ handle, artistName } = owner.user);
      }

      return {
        ...this._format(track),
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

      const formattedTrack = this._format(updatedTrack);

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

  private _format(track: PrismaTrack): Track {
    const { createdAt, updatedAt, ...rest } = track;

    const formattedCreatedAt = formatISO(createdAt);

    return {
      ...rest,
      bpm: rest.bpm ?? undefined,
      createdAt: formattedCreatedAt,
      peaksUrl: rest.url.replace(/\.[a-z0-9]+$/i, '.peaks'),
    };
  }

  private _accessFilter(viewerId: string): TrackWhereInput {
    return {
      OR: [
        { owner: { user: { id: viewerId } } },
        { visibility: 'PUBLIC' },
        { owner: { user: { followedBy: { some: { id: viewerId } } } }, visibility: 'SHARED' },
      ],
    };
  }

  private _criteriaFilters(input: GetTracksInput): TrackWhereInput {
    const { bpms, handles, ids, keys, modes, userIds, visibilities } = input;

    return {
      visibility: inFilter(visibilities),
      id: inFilter(ids),
      bpm: inFilter(bpms),
      mode: inFilter(modes),
      key: inFilter(keys),
      owner: { user: { handle: inFilter(handles), id: inFilter(userIds) } },
    };
  }

  private _buildFilters(input: GetTracksInput & { viewerId: string }): TrackWhereInput {
    return { AND: [this._criteriaFilters(input), this._accessFilter(input.viewerId)] };
  }
}

export const trackRepository = new TrackRepository(prisma);
