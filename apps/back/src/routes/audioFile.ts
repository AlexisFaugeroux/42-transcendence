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

export function audioRoutes(app: FastifyInstance) {
  app.get(
    '/get',
    { preHandler: app.authenticate, schema: { querystring: getAudioFileQuerySchema } },
    audioFileController.get,
  );
}
