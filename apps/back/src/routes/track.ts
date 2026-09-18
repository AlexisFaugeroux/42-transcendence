import { Permissions } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { trackController } from '../controllers/track/track';
import { Key, Mode, VisibilityType } from '../generated/prisma/enums';
import { paginatedResponseSchema } from './schemas/pagination';
import { trackSchema, tracksResponseSchema } from './schemas/track';

const trackFilterProperties = {
  bpms: {
    items: {
      type: 'integer',
    },
    minItems: 1,
    type: 'array',
    uniqueItems: true,
  },

  ids: {
    items: {
      format: 'uuid',
      type: 'string',
    },
    minItems: 1,
    type: 'array',
    uniqueItems: true,
  },

  keys: {
    items: {
      enum: Object.values(Key),
      type: 'string',
    },
    minItems: 1,
    type: 'array',
    uniqueItems: true,
  },

  modes: {
    items: {
      enum: Object.values(Mode),
      type: 'string',
    },
    minItems: 1,
    type: 'array',
    uniqueItems: true,
  },

  visibilities: {
    items: {
      enum: Object.values(VisibilityType),
      type: 'string',
    },
    minItems: 1,
    type: 'array',
    uniqueItems: true,
  },
};

export const producerTracksQuerySchema = {
  additionalProperties: false,
  properties: trackFilterProperties,
  type: 'object',
};

const getTrackQuerySchema = {
  additionalProperties: false,
  properties: {
    ...trackFilterProperties,

    userIds: {
      items: {
        format: 'uuid',
        type: 'string',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },
  },
  type: 'object',
};

const updateTrackSchema = {
  description: 'Partial update of the metadata of a track you own.',
  summary: 'Update a track',
  tags: ['tracks'],
  body: {
    additionalProperties: false,
    minProperties: 1,
    properties: {
      bpm: { maximum: 999, minimum: 1, type: ['integer', 'null'] },
      description: { maxLength: 1000, type: ['string', 'null'] },
      key: { enum: [...Object.values(Key), null], type: ['string', 'null'] },
      mode: { enum: [...Object.values(Mode), null], type: ['string', 'null'] },
      title: { maxLength: 255, minLength: 1, type: 'string' },
      visibility: { enum: Object.values(VisibilityType), type: 'string' },
    },
    type: 'object',
  },
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    200: trackSchema,
  },
};

const deleteTrackSchema = {
  description: 'Delete a track you own. A moderator may delete any track.',
  summary: 'Delete a track',
  tags: ['tracks'],
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
};

const trackIdQuerySchema = {
  additionalProperties: false,
  properties: {
    id: { format: 'uuid', type: 'string' },
  },
  required: ['id'],
  type: 'object',
};

const likeTrackSchema = {
  description:
    'Idempotent: a second like from the same account is a no-op, enforced by a unique constraint.',
  querystring: trackIdQuerySchema,
  response: {
    204: { type: 'null' },
  },
  summary: 'Like a track',
  tags: ['tracks'],
};

const unlikeTrackSchema = {
  description: 'Remove your like from a track. Removing a like that does not exist is a no-op.',
  querystring: trackIdQuerySchema,
  response: {
    204: { type: 'null' },
  },
  summary: 'Unlike a track',
  tags: ['tracks'],
};

const likedListQuerySchema = {
  additionalProperties: false,
  properties: {
    page: { type: 'string' },
    limit: { type: 'string' },
    q: { type: 'string' },
  },
  type: 'object',
};

const getTrackSchema = {
  description:
    'Tracks visible to you, filterable by owner and visibility, searchable through q and paginated.',
  summary: 'List tracks',
  tags: ['tracks'],
  querystring: getTrackQuerySchema,
  response: {
    200: tracksResponseSchema,
  },
};

const likedListSchema = {
  description: 'The tracks the authenticated account has liked, paginated.',
  summary: 'List liked tracks',
  tags: ['tracks'],
  querystring: likedListQuerySchema,
  response: {
    200: paginatedResponseSchema(trackSchema),
  },
};

// Multipart: the body cannot be schema-validated, it is checked in utils/validation.ts.
const uploadTrackSchema = {
  description:
    'Multipart upload of a rendered .wav export, with its title, description, visibility and musical metadata.',
  summary: 'Publish a track',
  tags: ['tracks'],
  response: {
    201: trackSchema,
  },
};

export function trackRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: getTrackSchema,
    },
    trackController.get,
  );

  app.get(
    '/liked',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: likedListSchema,
    },
    trackController.listLiked,
  );

  app.post(
    '/like',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: app.authenticate,
      schema: likeTrackSchema,
    },
    trackController.like,
  );

  app.delete(
    '/unlike',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: app.authenticate,
      schema: unlikeTrackSchema,
    },
    trackController.unlike,
  );

  app.post(
    '/upload',
    {
      config: { rateLimit: RATE_LIMITS.upload },
      preHandler: [app.authenticate, app.authorize(Permissions.TRACK_WRITE)],
      schema: uploadTrackSchema,
    },
    trackController.upload,
  );

  app.put(
    '/update',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.TRACK_WRITE)],
      schema: updateTrackSchema,
    },
    trackController.update,
  );

  app.delete(
    '/delete',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: app.authenticate,
      schema: deleteTrackSchema,
    },
    trackController.delete,
  );
}
