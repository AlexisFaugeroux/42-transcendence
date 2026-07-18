import type { FastifyInstance } from 'fastify';
import { audioFileController } from '../controllers/audioFile';

const getAudioFileQuerySchema = {
  additionalProperties: false,
  properties: {
    bpm: {
      items: {
        type: 'integer',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },

    id: {
      items: {
        type: 'string',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },

    key: {
      items: {
        type: 'string',
      },
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },

    visibility: {
      items: {
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
