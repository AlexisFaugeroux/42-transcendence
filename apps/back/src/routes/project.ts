import type { FastifyInstance } from 'fastify';
import { Permissions } from '@transcendence/permissions';
import { RATE_LIMITS } from '../constants';
import { projectController } from '../controllers/project/project';
import { Key, Mode, VisibilityType } from '../generated/prisma/enums';
import { projectSchema, projectsResponseSchema } from './schemas/project';

const saveProjectSchema = {
  description: 'Persist the serialized state of a studio session, creating it or overwriting it.',
  summary: 'Save a studio project',
  tags: ['project'],
  body: {
    additionalProperties: false,
    properties: {
      bpm: { maximum: 1000, minimum: 1, type: 'number' },
      duration: { minimum: 0, type: 'number' },
      id: { minLength: 1, type: 'string' },
      key: { enum: Object.values(Key), type: 'string' },
      mode: { enum: Object.values(Mode), type: 'string' },
      name: { maxLength: 128, minLength: 1, type: 'string' },
      samples: { items: { type: 'string' }, type: 'array', uniqueItems: true },
      state: { contentEncoding: 'base64', minLength: 1, type: 'string' },
      visibility: { enum: Object.values(VisibilityType), type: 'string' },
    },
    required: ['id', 'name', 'duration', 'visibility', 'samples', 'state'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
};

const loadProjectSchema = {
  description: 'The serialized state of one of your sessions, ready to be reopened in the studio.',
  summary: 'Load a studio project',
  tags: ['project'],
  querystring: {
    additionalProperties: false,
    properties: {
      id: { minLength: 1, type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    200: projectSchema,
  },
};

const listProjectsSchema = {
  description: 'The sessions of the authenticated account, paginated.',
  summary: 'List your studio projects',
  tags: ['project'],
  response: {
    200: projectsResponseSchema,
  },
};

const deleteProjectSchema = {
  description: 'Delete one of your sessions. Tracks exported from it are kept.',
  summary: 'Delete a studio project',
  tags: ['project'],
  querystring: {
    additionalProperties: false,
    properties: {
      id: { minLength: 1, type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    204: { type: 'null' },
  },
};

const updateProjectSchema = {
  description: 'Rename, archive or change the visibility of one of your sessions.',
  summary: 'Update a studio project',
  tags: ['project'],
  body: {
    additionalProperties: false,
    minProperties: 1,
    properties: {
      archived: { type: 'boolean' },
      name: { maxLength: 128, minLength: 1, type: 'string' },
    },
    type: 'object',
  },
  querystring: {
    additionalProperties: false,
    properties: {
      id: { minLength: 1, type: 'string' },
    },
    required: ['id'],
    type: 'object',
  },
  response: {
    200: projectSchema,
  },
};

export function projectRoutes(app: FastifyInstance) {
  app.put(
    '/save',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.STUDIO_ACCESS)],
      schema: saveProjectSchema,
    },
    projectController.save,
  );

  app.get(
    '/load',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.STUDIO_ACCESS)],
      schema: loadProjectSchema,
    },
    projectController.load,
  );

  app.get(
    '/list',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.STUDIO_ACCESS)],
      schema: listProjectsSchema,
    },
    projectController.list,
  );

  app.put(
    '/update',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.STUDIO_ACCESS)],
      schema: updateProjectSchema,
    },
    projectController.update,
  );

  app.delete(
    '/delete',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.STUDIO_ACCESS)],
      schema: deleteProjectSchema,
    },
    projectController.detele,
  );
}
