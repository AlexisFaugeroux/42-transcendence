import { USER_KINDS } from '../../domain/sample';
import { Family, Key, Mode, OwnerType, VisibilityType } from '../../generated/prisma/enums';

export const sampleSchema = {
  additionalProperties: false,
  properties: {
    bpm: { type: ['integer', 'null'] },
    bytes: { minimum: 0, type: 'integer' },
    createdAt: { format: 'date-time', type: 'string' },
    duration: { minimum: 0, type: 'number' },
    family: { enum: [...Object.values(Family), null], type: ['string', 'null'] },
    id: { type: 'string' },
    key: { enum: [...Object.values(Key), null], type: ['string', 'null'] },
    kind: { enum: [...USER_KINDS, null], type: ['string', 'null'] },
    mode: { enum: [...Object.values(Mode), null], type: ['string', 'null'] },
    name: { type: 'string' },
    ownerId: { type: 'string' },
    peaksUrl: { type: 'string' },
    url: { type: 'string' },
    visibility: { enum: [...Object.values(VisibilityType), null], type: ['string', 'null'] },
  },
  required: ['id', 'name', 'ownerId', 'url', 'peaksUrl', 'duration', 'bytes', 'createdAt'],
  type: 'object',
};

export const sampleWithOwnerTypeSchema = {
  additionalProperties: false,
  properties: {
    ...sampleSchema.properties,
    ownerType: { enum: Object.values(OwnerType), type: 'string' },
  },
  required: [...sampleSchema.required, 'ownerType'],
  type: 'object',
};
