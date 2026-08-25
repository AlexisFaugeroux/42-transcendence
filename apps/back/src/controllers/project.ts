import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { BadRequestError, ForbiddenError, NotFoundError } from '../domain/errors';
import type { Project, SaveProjectBody, UpdateProjectInput } from '../domain/project';
import { projectRepository } from '../repositories/project';
import { userRepository } from '../repositories/user';

interface SaveProjectRoute extends RouteGenericInterface {
  Body: SaveProjectBody;
}

interface LoadProjectRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
  Reply: Project;
}

interface ListProjectRoute extends RouteGenericInterface {
  Reply: Project[];
}

interface UpdateProjectRoute extends RouteGenericInterface {
  Body: UpdateProjectInput;
  Querystring: {
    id: string;
  };
  Reply: Project;
}

interface RemoveProjectRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}

class ProjectController {
  public save = async (req: FastifyRequest<SaveProjectRoute>, reply: FastifyReply) => {
    const { state, ...rest } = req.body;

    const user = await userRepository.findById(req.authUser.id);
    if (!user.ownerId) throw new NotFoundError('No Owner found for this project');

    const project = await projectRepository.get({
      ids: [rest.id],
      ownerIds: [],
      visibilities: [],
    });
    if (project.length) {
      if (project[0].ownerId !== user.ownerId)
        throw new NotFoundError("Owner_id mismatch project's owner");
    }

    const decodedState = Buffer.from(state, 'base64');

    await projectRepository.upsert({
      ...rest,
      ownerId: user.ownerId,
      state: decodedState,
    });

    reply.code(204).send();
  };

  public list = async (
    req: FastifyRequest<ListProjectRoute>,
    reply: FastifyReply<ListProjectRoute>,
  ) => {
    const user = await userRepository.findById(req.authUser.id);
    const project = await projectRepository.get({
      ids: [],
      ownerIds: [user.ownerId],
      visibilities: [],
    });
    reply.code(200).send(project);
  };

  public load = async (
    req: FastifyRequest<LoadProjectRoute>,
    reply: FastifyReply<LoadProjectRoute>,
  ) => {
    const { id } = req.query;

    const user = await userRepository.findById(req.authUser.id);
    const project = await projectRepository.findById(id);

    if (user.ownerId !== project.ownerId) throw new ForbiddenError();

    reply.code(200).send(project);
  };

  public update = async (
    req: FastifyRequest<UpdateProjectRoute>,
    reply: FastifyReply<UpdateProjectRoute>,
  ) => {
    if (!Object.keys(req.body).length) throw new BadRequestError('No field to update');

    const user = await userRepository.findById(req.authUser.id);
    const project = await projectRepository.findById(req.query.id);

    if (user.ownerId !== project.ownerId) throw new ForbiddenError();

    const updated = await projectRepository.update(req.query.id, req.body);

    reply.code(200).send(updated);
  };

  public detele = async (req: FastifyRequest<RemoveProjectRoute>, reply: FastifyReply) => {
    const { id } = req.query;

    const user = await userRepository.findById(req.authUser.id);
    const project = await projectRepository.findById(id);

    if (user.ownerId !== project.ownerId) throw new ForbiddenError();

    await projectRepository.delete(id);

    reply.code(204).send();
  };
}

export const projectController = new ProjectController();
