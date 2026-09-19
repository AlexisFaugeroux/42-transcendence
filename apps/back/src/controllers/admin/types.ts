import type { RouteGenericInterface } from 'fastify';
import type { Role } from '@transcendence/permissions';
import type { PaginatedResponse } from '../../domain/pagination';
import type { SessionListResponse } from '../../domain/session';
import type { Track } from '../../domain/track';
import type { GetUserInput, UpdateUserInput, User } from '../../domain/user';

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

export interface GetTracksRoute extends RouteGenericInterface {
  Querystring: {
    page?: string;
    limit?: string;
    q?: string;
  };
  Reply: PaginatedResponse<Track>;
}
