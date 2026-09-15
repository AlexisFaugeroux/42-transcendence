import { ConflictError } from '../../domain/errors';
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
      include: {
        owner: { include: { user: true } },
        _count: { select: { likes: true } },
        likes: {
          where: { userId: input.viewerId },
          select: { id: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      where: buildFilters(input),
    });

    const formattedTracks = tracks.map(({ _count, likes, owner, ...track }) => {
      let artistName: string | undefined, handle: string | undefined;

      if (owner.user) {
        ({ artistName, handle } = owner.user);
      }

      return {
        ...formatTrack(track, {
          likesCount: _count.likes,
          isLiked: likes.length > 0,
        }),
        ...(owner.user && artistName && handle && { owner: { artistName, handle } }),
      };
    });

    return formattedTracks;
  }

  public async like(userId: string, trackId: string): Promise<void> {
    try {
      await this._prisma.trackLike.create({
        data: { trackId, userId },
      });
    } catch (error: unknown) {
      const mappedError = mapError(error, 'TrackLike');
      if (mappedError instanceof ConflictError) return;
      throw mappedError;
    }
  }

  public async unlike(userId: string, trackId: string): Promise<void> {
    await this._prisma.trackLike.deleteMany({
      where: { trackId, userId },
    });
  }

  public async listLiked(
    likerId: string,
    viewerId: string,
    options: { skip?: number; take?: number; q?: string; publicOnly?: boolean } = {},
  ): Promise<{ items: Track[]; total: number }> {
    const search = options.q?.trim();
    const where = {
      userId: likerId,
      track: {
        ...(options.publicOnly ? { visibility: 'PUBLIC' as const } : {}),
        ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
      },
    };

    const [rows, total] = await Promise.all([
      this._prisma.trackLike.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          track: {
            include: {
              owner: { include: { user: true } },
              _count: { select: { likes: true } },
              likes: {
                where: { userId: viewerId },
                select: { id: true },
                take: 1,
              },
            },
          },
        },
        ...(options.take !== undefined ? { skip: options.skip, take: options.take } : {}),
      }),
      this._prisma.trackLike.count({ where }),
    ]);

    return {
      items: rows.map(({ track: { _count, likes, owner, ...track } }) => {
        let artistName: string | undefined, handle: string | undefined;
        if (owner.user) {
          ({ artistName, handle } = owner.user);
        }
        return {
          ...formatTrack(track, {
            isLiked: likes.length > 0,
            likesCount: _count.likes,
          }),
          ...(owner.user && artistName && handle && { owner: { artistName, handle } }),
        };
      }),
      total,
    };
  }

  public async listLikedByHandle(
    handle: string,
    viewerId: string,
    options: { skip?: number; take?: number; q?: string } = {},
  ): Promise<{ items: Track[]; total: number }> {
    try {
      const user = await this._prisma.user.findUniqueOrThrow({ where: { handle } });
      return await this.listLiked(user.id, viewerId, { ...options, publicOnly: true });
    } catch (error: unknown) {
      throw mapError(error, 'User');
    }
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
