import type { RouteGenericInterface } from 'fastify';
import type {
  PaginatedProducersResponse,
  ProducerProfileResponse,
  UpdateUserInput,
  UserOnlineStatus,
  UserResponse,
} from '../../domain/user';

export interface UpdateProfileRoute extends RouteGenericInterface {
  Body: UpdateUserInput;
  Reply: UserResponse;
}

export interface UpdatePasswordRoute extends RouteGenericInterface {
  Body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface ListProducersRoute extends RouteGenericInterface {
  Querystring: {
    page?: string;
    limit?: string;
    q?: string;
  };
  Reply: PaginatedProducersResponse;
}

export interface GetProfileRoute extends RouteGenericInterface {
  Params: { handle: string };
  Reply: ProducerProfileResponse;
}

export interface ListFollowProducersRoute extends RouteGenericInterface {
  Params: { handle: string };
  Querystring: { page?: string; limit?: string; q?: string };
  Reply: PaginatedProducersResponse;
}

export interface FollowRoute extends RouteGenericInterface {
  Params: { handle: string };
}

export interface UploadAvatarRoute extends RouteGenericInterface {
  Reply: UserResponse;
}

export interface ListFollowingUsers extends RouteGenericInterface {
  Reply: UserOnlineStatus[];
}
