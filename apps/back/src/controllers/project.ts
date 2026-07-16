import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { ForbiddenError, NotFoundError } from '../domain/errors';
import type { Project, SaveProjectBody } from '../domain/project';
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
    if (rest.id !== user.ownerId) throw new ForbiddenError();

    const decodedState = Buffer.from(state, 'base64');

    await projectRepository.upsert({
      ...rest,
      ownerId: user.ownerId,
      state: decodedState,
    });

    reply.code(204).send();
  };

  public load = async (req: FastifyRequest<LoadProjectRoute>, reply: FastifyReply<LoadProjectRoute>) => {
    const { id } = req.query;

    const user = await userRepository.findById(req.authUser.id);
    const project = await projectRepository.findById(id);

    if (user.ownerId !== project.ownerId) throw new ForbiddenError();

    reply.code(200).send(project);
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
