import type { RouteGenericInterface } from 'fastify';

import type { Project, SaveProjectBody, UpdateProjectInput } from '../../domain/project';

export interface SaveProjectRoute extends RouteGenericInterface {
  Body: SaveProjectBody;
}

export interface LoadProjectRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
  Reply: Project;
}

export interface ListProjectRoute extends RouteGenericInterface {
  Reply: Project[];
}

export interface UpdateProjectRoute extends RouteGenericInterface {
  Body: UpdateProjectInput;
  Querystring: {
    id: string;
  };
  Reply: Project;
}

export interface RemoveProjectRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}
