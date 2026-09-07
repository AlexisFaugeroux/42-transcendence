import type { FastifyInstance } from 'fastify';
import { projectController } from '../controllers/project';

const saveProjectSchema = {
  body: {
    additionalProperties: false,
    properties: {
      bpm: { maximum: 1000, minimum: 1, type: 'number' },
      duration: { minimum: 0, type: 'number' },
      id: { minLength: 1, type: 'string' },
      key: {
        enum: [
          'A_key',
          'A_sharp_key',
          'B_flat_key',
          'B_key',
          'C_key',
          'C_sharp_key',
          'D_flat_key',
          'D_key',
          'D_sharp_key',
          'E_flat_key',
          'E_key',
          'F_key',
          'F_sharp_key',
          'G_flat_key',
          'G_key',
          'G_sharp_key',
          'A_flat_key',
        ],
        type: 'string',
      },
      mode: { enum: ['MAJOR', 'MINOR'], type: 'string' },
      name: { maxLength: 128, minLength: 1, type: 'string' },
      samples: { items: { type: 'string' }, type: 'array', uniqueItems: true },
      state: { contentEncoding: 'base64', minLength: 1, type: 'string' },
      visibility: { enum: ['PRIVATE', 'SHARED', 'PUBLIC'], type: 'string' },
    },
    required: ['id', 'name', 'bpm', 'duration', 'visibility', 'samples', 'state'],
    type: 'object',
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
};

export function projectRoutes(app: FastifyInstance) {
  app.put(
    '/save',
    { preHandler: [app.authenticate, app.authorize('studio:access')], schema: saveProjectSchema },
    projectController.save,
  );

  app.get(
    '/load',
    { preHandler: [app.authenticate, app.authorize('studio:access')], schema: loadProjectSchema },
    projectController.load,
  );

  app.get(
    '/list',
    { preHandler: [app.authenticate, app.authorize('studio:access')] },
    projectController.list,
  );

  app.put(
    '/update',
    { preHandler: [app.authenticate, app.authorize('studio:access')], schema: updateProjectSchema },
    projectController.update,
  );

  app.delete(
    '/delete',
    {
      preHandler: [app.authenticate, app.authorize('studio:access')],
      schema: deleteProjectSchema,
    },
    projectController.detele,
  );
}
