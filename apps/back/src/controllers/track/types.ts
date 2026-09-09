import type { RouteGenericInterface } from 'fastify';
import type { GetTracksInput, Track, UpdateTrackInput } from '../../domain/track';

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
