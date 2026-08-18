import type { FastifyInstance } from 'fastify';
import { trackController } from '../controllers/track';
import { Key, Mode, VisibilityType } from '../generated/prisma/enums';

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
};

const deleteTrackSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
};

export function trackRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    { preHandler: app.authenticate, schema: { querystring: getTrackQuerySchema } },
    trackController.get,
  );

  app.post('/upload', { preHandler: app.authenticate }, trackController.upload);

  app.put(
    '/update',
    { preHandler: app.authenticate, schema: updateTrackSchema },
    trackController.update,
  );

  app.delete(
    '/delete',
    { preHandler: app.authenticate, schema: deleteTrackSchema },
    trackController.delete,
  );
}
