import { Permissions } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { projectController } from '../controllers/project/project';
import { Key, Mode, VisibilityType } from '../generated/prisma/enums';
import { projectSchema, projectsResponseSchema } from './schemas/project';

const saveProjectSchema = {
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
  response: {
    200: projectsResponseSchema,
  },
};

const deleteProjectSchema = {
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
