import { Key, Mode, VisibilityType } from '../../generated/prisma/enums';

export const trackSchema = {
  additionalProperties: false,
  properties: {
    bpm: { type: 'integer' },
    bytes: { minimum: 0, type: 'integer' },
    createdAt: { format: 'date-time', type: 'string' },
    description: { type: ['string', 'null'] },
    duration: { minimum: 0, type: 'number' },
    id: { type: 'string' },
    isLiked: { type: 'boolean' },
    key: { enum: [...Object.values(Key), null], type: ['string', 'null'] },
    likesCount: { minimum: 0, type: 'integer' },
    mode: { enum: [...Object.values(Mode), null], type: ['string', 'null'] },
    owner: {
      additionalProperties: false,
      properties: {
        artistName: { type: 'string' },
        handle: { type: 'string' },
      },
      required: ['artistName', 'handle'],
      type: 'object',
    },
    ownerId: { type: 'string' },
    peaksUrl: { type: 'string' },
    projectId: { type: ['string', 'null'] },
    title: { type: 'string' },
    url: { type: 'string' },
    visibility: { enum: Object.values(VisibilityType), type: 'string' },
  },
  required: [
    'id',
    'ownerId',
    'title',
    'visibility',
    'url',
    'peaksUrl',
    'duration',
    'bytes',
    'createdAt',
    'likesCount',
    'isLiked',
  ],
  type: 'object',
};

export const tracksResponseSchema = { items: trackSchema, type: 'array' };
