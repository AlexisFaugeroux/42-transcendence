import { FastifyInstance } from "fastify";
import { audioFileController } from "../controllers/audioFile";


const getAudioFileQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ownerId: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },

    id: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },

    bpm: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'integer',
      },
    },

    key: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },

    visibility: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
  },
}

export function audioRoute( app : FastifyInstance ){
    app.get("/get", { schema: { querystring : getAudioFileQuerySchema } },
         audioFileController.get );
}