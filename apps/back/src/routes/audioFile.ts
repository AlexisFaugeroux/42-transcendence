import type { FastifyInstance } from 'fastify';
import { audioFileController } from '../controllers/audioFile';
import { USER_KINDS } from '../domain/audioFile';
import { AudioFileKind, Family, Key, Mode, VisibilityType } from '../generated/prisma/enums';

const getAudioFileQuerySchema = {
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
        enum: Object.values(AudioFileKind),
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
  },
  type: 'object',
};

const storageAudioFileSchema = {
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
        quotaBytes: { minimum: 0, type: 'integer' },
        usedBytes: { minimum: 0, type: 'integer' },
      },
      required: ['usedBytes', 'quotaBytes', 'byFamily'],
      type: 'object',
    },
  },
};

const updateAudioFileSchema = {
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

const deleteAudioFileSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      id: { format: 'uuid', type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
};

export function audioRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    { preHandler: app.authenticate, schema: { querystring: getAudioFileQuerySchema } },
    audioFileController.get,
  );

  app.get('/storage', { preHandler: app.authenticate, schema: storageAudioFileSchema }, audioFileController.storage);

  app.post('/upload', { preHandler: app.authenticate }, audioFileController.upload);

  app.put('/update', { preHandler: app.authenticate, schema: updateAudioFileSchema }, audioFileController.update);

  app.delete('/delete', { preHandler: app.authenticate, schema: deleteAudioFileSchema }, audioFileController.delete);
}
