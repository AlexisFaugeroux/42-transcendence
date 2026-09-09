import type { FastifyInstance } from 'fastify';
import { sampleController } from '../controllers/sample/sample';
import { USER_KINDS } from '../domain/sample';
import { Family, Key, Mode, SampleKind, VisibilityType } from '../generated/prisma/enums';

const getSampleQuerySchema = {
  additionalProperties: false,
  properties: {
    bpms: {
      items: {
        type: 'integer',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },

    families: {
      items: {
        enum: Object.values(Family),
        type: 'string',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },

    ids: {
      items: {
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

    kinds: {
      items: {
        enum: Object.values(SampleKind),
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

    page: { type: 'string' },
    limit: { type: 'string' },
    q: { type: 'string' },
  },
  type: 'object',
};

const storageSampleSchema = {
  querystring: {
    additionalProperties: false,
    properties: {},
    type: 'object',
  },
  response: {
    200: {
      additionalProperties: false,
      properties: {
        byFamily: {
          items: {
            additionalProperties: false,
            properties: {
              bytes: { minimum: 0, type: 'integer' },
              family: { enum: [...Object.values(Family), null], type: ['string', 'null'] },
            },
            required: ['family', 'bytes'],
            type: 'object',
          },
          type: 'array',
        },
        maxUploadBytes: { minimum: 0, type: 'integer' },
        quotaBytes: { minimum: 0, type: 'integer' },
        usedBytes: { minimum: 0, type: 'integer' },
      },
      required: ['usedBytes', 'quotaBytes', 'maxUploadBytes', 'byFamily'],
      type: 'object',
    },
  },
};

const updateSampleSchema = {
  body: {
    additionalProperties: false,
    minProperties: 1,
    properties: {
      bpm: { maximum: 999, minimum: 1, type: ['integer', 'null'] },
      family: { enum: [...Object.values(Family), null], type: ['string', 'null'] },
      key: { enum: [...Object.values(Key), null], type: ['string', 'null'] },
      kind: { enum: [...USER_KINDS, null], type: ['string', 'null'] },
      mode: { enum: [...Object.values(Mode), null], type: ['string', 'null'] },
      name: { maxLength: 255, minLength: 1, type: 'string' },
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

const deleteSampleSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
};

export function sampleRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    { preHandler: app.authenticate, schema: { querystring: getSampleQuerySchema } },
    sampleController.get,
  );

  app.get(
    '/storage',
    { preHandler: app.authenticate, schema: storageSampleSchema },
    sampleController.storage,
  );

  app.post(
    '/upload',
    { preHandler: [app.authenticate, app.authorize('sample:write')] },
    sampleController.upload,
  );

  app.put(
    '/update',
    {
      preHandler: [app.authenticate, app.authorize('sample:write')],
      schema: updateSampleSchema,
    },
    sampleController.update,
  );

  app.delete(
    '/delete',
    {
      preHandler: [app.authenticate, app.authorize('sample:write')],
      schema: deleteSampleSchema,
    },
    sampleController.delete,
  );
}
