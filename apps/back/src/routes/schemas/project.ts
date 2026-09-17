import { Key, Mode, ProjectType } from '../../generated/prisma/enums';

export const projectSchema = {
  additionalProperties: false,
  properties: {
    archived: { type: 'boolean' },
    bpm: { type: 'integer' },
    createdAt: { format: 'date-time', type: 'string' },
    duration: { minimum: 0, type: 'number' },
    id: { type: 'string' },
    key: { enum: Object.values(Key), type: 'string' },
    mode: { enum: Object.values(Mode), type: 'string' },
    name: { type: 'string' },
    ownerId: { type: 'string' },
    samples: { items: { type: 'string' }, type: 'array' },
    state: { type: 'string' },
    type: { enum: Object.values(ProjectType), type: 'string' },
    updatedAt: { format: 'date-time', type: 'string' },
  },
  required: [
    'id',
    'ownerId',
    'name',
    'duration',
    'bpm',
    'type',
    'archived',
    'samples',
    'state',
    'createdAt',
    'updatedAt',
  ],
  type: 'object',
};

export const projectsResponseSchema = { items: projectSchema, type: 'array' };
