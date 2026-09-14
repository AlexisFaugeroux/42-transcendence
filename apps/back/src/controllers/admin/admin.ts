import { Role } from '@transcendence/permissions';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { BadRequestError, ConflictError } from '../../domain/errors';
import type { PaginatedResponse } from '../../domain/pagination';
import type { SessionListResponse } from '../../domain/session';
import {
  type GetUserInput,
  type UpdateUserInput,
  type User,
  USER_SEARCH_FIELDS,
} from '../../domain/user';
import { sessionRepository } from '../../repositories/session/session';
import { userRepository } from '../../repositories/user/user';
import { sampleStorageService } from '../../services/audio/sampleStorage';
import { trackStorageService } from '../../services/audio/trackStorage';
import { avatarStorageService } from '../../services/avatarStorage';
import { parsePagination, toPaginatedResponse } from '../../utils/pagination';
import { webSocketRegistry } from '../../utils/websockets';

export interface GetUsersRoute extends RouteGenericInterface {
  Querystring: Pick<GetUserInput, 'roles'> & {
    page?: string;
    limit?: string;
    q?: string;
  };
  Reply: PaginatedResponse<User>;
}

export interface UpdateUserRoute extends RouteGenericInterface {
  Body: UpdateUserInput & { id: string };
  Reply: User;
}

export interface UpdateUserRoleRoute extends RouteGenericInterface {
  Body: { id: string; role: Role };
}

export interface DeleteUserRoute extends RouteGenericInterface {
  Querystring: { id: string };
}

export interface RevokeSessionRoute extends RouteGenericInterface {
  Body: { id: string };
}

export interface ListSessionsRoute extends RouteGenericInterface {
  Querystring: { id: string };
  Reply: SessionListResponse;
}

class AdminController {
  public get = async (
    req: FastifyRequest<GetUsersRoute>,
    reply: FastifyReply<GetUsersRoute>,
  ): Promise<void> => {
    const pagination = parsePagination(req.query.page, req.query.limit);
    const skip = pagination.unpaginated ? undefined : pagination.skip;
    const take = pagination.unpaginated ? undefined : pagination.take;

    const { page, limit, ...filters } = req.query;

    const { items: users, total } = await userRepository.get({
      ...filters,
      searchOn: USER_SEARCH_FIELDS,
      skip,
      take,
    });

    reply.code(200).send(toPaginatedResponse(pagination, users, total));
  };

  public update = async (
    req: FastifyRequest<UpdateUserRoute>,
    reply: FastifyReply<UpdateUserRoute>,
  ): Promise<void> => {
    const updatedUser = await userRepository.update(req.body.id, req.body);

    reply.code(200).send(updatedUser);
  };

  public role = async (
    req: FastifyRequest<UpdateUserRoleRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    if (req.body.id === req.authUser.id) throw new BadRequestError('Cannot self update role');

    const { items: admins } = await userRepository.get({ roles: [Role.ADMIN] });
    // Do not downgrade the last admin to a lower role
    if (admins.length === 1 && admins[0].id === req.body.id && req.body.role !== Role.ADMIN) {
      throw new ConflictError('Cannot assign lower role to last admin user');
    }

    await userRepository.update(req.body.id, { role: req.body.role });

    reply.code(204).send();
  };

  public delete = async (
    req: FastifyRequest<DeleteUserRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    if (req.query.id === req.authUser.id) throw new BadRequestError('Cannot self delete as admin');

    const user = await userRepository.find({ id: req.query.id });

    const { items: admins } = await userRepository.get({ roles: [Role.ADMIN] });
    // Do not delete the last admin
    if (admins.length === 1 && admins[0].id === user.id) {
      throw new ConflictError('Cannot delete last admin user');
    }

    await userRepository.delete(user.id);

    await sampleStorageService.deleteDirectory(user.ownerId);
    await trackStorageService.deleteDirectory(user.ownerId);
    await avatarStorageService.remove(user.ownerId);

    reply.code(204).send();
  };

  public sessions = async (
    req: FastifyRequest<ListSessionsRoute>,
    reply: FastifyReply<ListSessionsRoute>,
  ): Promise<void> => {
    const { items, total } = await sessionRepository.listValidForUser(req.query.id);

    reply.code(200).send({ items, total });
  };

  public revokeSession = async (req: FastifyRequest<RevokeSessionRoute>, reply: FastifyReply) => {
    const { id } = req.body;

    await sessionRepository.revokeAllForUser(id);

    webSocketRegistry.closeAll(id);

    reply.code(204).send();
  };
}

export const adminController = new AdminController();
