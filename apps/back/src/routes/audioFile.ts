import type { FastifyInstance } from 'fastify';
import { audioFileController } from '../controllers/audioFile';
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

  app.post('/upload', { preHandler: app.authenticate }, audioFileController.upload);

  app.delete('/delete', { preHandler: app.authenticate, schema: deleteAudioFileSchema }, audioFileController.delete);
}
