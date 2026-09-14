import { Role } from '@transcendence/permissions';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { BadRequestError, ConflictError } from '../../domain/errors';
import type { PaginatedResponse } from '../../domain/pagination';
import {
  type GetUserInput,
  type UpdateUserInput,
  USER_SEARCH_FIELDS,
  type User,
} from '../../domain/user';
import { sessionRepository } from '../../repositories/session/session';
import { userRepository } from '../../repositories/user/user';
import { sampleStorageService } from '../../services/audio/sampleStorage';
import { trackStorageService } from '../../services/audio/trackStorage';
import { avatarStorageService } from '../../services/avatarStorage';
import { parsePagination, toPaginatedResponse } from '../../utils/pagination';

export interface GetUsersRoute extends RouteGenericInterface {
  Querystring: Pick<GetUserInput, 'roles'> & {
    page?: string;
    limit?: string;
    q?: string;
  };
  Reply: PaginatedResponse<User>;
}

export interface UpdateUserRoute extends RouteGenericInterface {
  Querystring: { id: string };
  Body: UpdateUserInput;
  Reply: User;
}

export interface UpdateUserRoleRoute extends RouteGenericInterface {
  Querystring: { id: string };
  Body: { role: Role };
}

export interface DeleteUserRoute extends RouteGenericInterface {
  Querystring: { id: string };
}

export interface RevokeSessionRoute extends RouteGenericInterface {
  Querystring: { id: string };
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
    const updatedUser = await userRepository.update(req.query.id, req.body);

    reply.code(200).send(updatedUser);
  };

  public role = async (
    req: FastifyRequest<UpdateUserRoleRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    if (req.query.id === req.authUser.id) throw new BadRequestError('Cannot self update role');

    const { items: admins } = await userRepository.get({ roles: [Role.ADMIN] });
    // Do not downgrade the last admin to a lower role
    if (admins.length === 1 && admins[0].id === req.query.id && req.body.role !== Role.ADMIN) {
      throw new ConflictError('Cannot assign lower role to last admin user');
    }

    await userRepository.update(req.query.id, { role: req.body.role });

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

  public revokeSession = async (req: FastifyRequest<RevokeSessionRoute>, reply: FastifyReply) => {
    await sessionRepository.revokeAllForUser(req.query.id);

    reply.code(204).send();
  };
}

export const adminController = new AdminController();
