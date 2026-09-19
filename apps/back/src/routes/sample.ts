import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { sampleController } from '../controllers/sample/sample';
import { SAMPLE_SORTS, USER_KINDS } from '../domain/sample';
import { Family, Key, Mode, SampleKind, VisibilityType } from '../generated/prisma/enums';
import { paginatedResponseSchema } from './schemas/pagination';
import { sampleSchema, sampleWithOwnerTypeSchema } from './schemas/sample';

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

    sort: { enum: [...SAMPLE_SORTS], type: 'string' },

    page: { type: 'string' },
    limit: { type: 'string' },
    q: { type: 'string' },
  },
  type: 'object',
};

const getSampleSchema = {
  description:
    'Your samples plus the platform library, filterable by BPM, key, mode, family, kind and visibility, searchable through q, sortable through sort, and paginated. Omitting page and limit returns the full list.',
  summary: 'List samples',
  tags: ['samples'],
  querystring: getSampleQuerySchema,
  response: {
    200: paginatedResponseSchema(sampleWithOwnerTypeSchema),
  },
};

// Multipart: the body cannot be schema-validated, it is checked in utils/validation.ts.
const uploadSampleSchema = {
  description:
    'Multipart upload of a .wav. The file is decoded server-side, a .peaks waveform sidecar is written next to it, and the quota is checked before the row is inserted.',
  summary: 'Upload a sample',
  tags: ['samples'],
  response: {
    201: sampleSchema,
  },
};

const storageSampleSchema = {
  description: 'Bytes used, per-family breakdown, the per-upload limit and the account quota.',
  summary: 'Get your storage usage',
  tags: ['samples'],
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
  description: 'Partial update of the metadata of a sample you own. The audio itself is immutable.',
  summary: 'Update a sample',
  tags: ['samples'],
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
  response: {
    200: sampleSchema,
  },
};

const deleteSampleSchema = {
  description: 'Delete a sample you own, together with its .wav and its .peaks sidecar.',
  summary: 'Delete a sample',
  tags: ['samples'],
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

export function sampleRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: getSampleSchema,
    },
    sampleController.get,
  );

  app.get(
    '/storage',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: app.authenticate,
      schema: storageSampleSchema,
    },
    sampleController.storage,
  );

  app.post(
    '/upload',
    {
      config: { rateLimit: RATE_LIMITS.upload },
      preHandler: [app.authenticate, app.authorize('sample:write')],
      schema: uploadSampleSchema,
    },
    sampleController.upload,
  );

  app.put(
    '/update',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize('sample:write')],
      schema: updateSampleSchema,
    },
    sampleController.update,
  );

  app.delete(
    '/delete',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize('sample:write')],
      schema: deleteSampleSchema,
    },
    sampleController.delete,
  );
}
