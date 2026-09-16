import type { RouteGenericInterface } from 'fastify';
import type { PaginatedResponse } from '../../domain/pagination';
import type { GetTracksInput, Track, UpdateTrackInput } from '../../domain/track';

export interface LikeTrackRoute extends RouteGenericInterface {
  Querystring: { id: string };
}

export interface ListLikedTracksRoute extends RouteGenericInterface {
  Querystring: { page?: string; limit?: string; q?: string };
  Reply: PaginatedResponse<Track>;
}

export interface ListProducerLikedTracksRoute extends RouteGenericInterface {
  Params: { handle: string };
  Querystring: { page?: string; limit?: string; q?: string };
  Reply: PaginatedResponse<Track>;
}

export interface GetTracksRoute extends RouteGenericInterface {
  Params: { handle?: string };
  Querystring: GetTracksInput;
  Reply: Track[];
}

export interface UploadTrackRoute extends RouteGenericInterface {
  Reply: Track;
}

export interface UpdateTrackRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
  Body: UpdateTrackInput;
  Reply: Track;
}

export interface DeleteTrackRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}
