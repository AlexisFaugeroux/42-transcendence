import { dayjs } from '@transcendence/date';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { AVATAR_MAX_BYTES } from '../constants';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  PayloadTooLargeError,
} from '../domain/errors';
import type {
  PublicProducerProfileResponse,
  PublicProducersResponse,
  UpdateUserInput,
  User,
  UserResponse,
} from '../domain/user';
import type { OnlineUser } from '../domain/user';
import { userRepository } from '../repositories/user';
import { avatarStorageService } from '../services/avatarStorage';
import { imageService } from '../services/imageService';
import { sampleStorageService } from '../services/sampleStorage';
import { hashPassword, verifyPassword } from '../utils/password';

interface UpdateProfileRoute extends RouteGenericInterface {
  Body: UpdateUserInput;
  Reply: UserResponse;
}

interface UpdatePasswordRoute extends RouteGenericInterface {
  Body: {
    oldPassword: string;
    newPassword: string;
  };
}

interface ListProducersRoute extends RouteGenericInterface {
  Reply: PublicProducersResponse;
}

interface HandleParam {
  handle: string;
}

interface GetProfileRoute extends RouteGenericInterface {
  Params: HandleParam;
  Reply: PublicProducerProfileResponse;
}

interface ListFollowRoute extends RouteGenericInterface {
  Params: HandleParam;
  Reply: PublicProducersResponse;
}

interface FollowRoute extends RouteGenericInterface {
  Params: HandleParam;
}

interface UploadAvatarRoute extends RouteGenericInterface {
  Reply: UserResponse;
}

interface ListUser extends RouteGenericInterface {
  Querystring: {
    ids?: string[];
  };
  Reply: OnlineUser[];
}

class UserController {
  public updateProfile = async (
    req: FastifyRequest<UpdateProfileRoute>,
    reply: FastifyReply<UpdateProfileRoute>,
  ): Promise<void> => {
    const updatedUser = await userRepository.update(req.authUser.id, req.body);

    reply.code(200).send({ user: updatedUser });
  };

  public updatePassword = async (
    req: FastifyRequest<UpdatePasswordRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { newPassword, oldPassword } = req.body;

    const user = await userRepository.findById(req.authUser.id);

    if (!(await verifyPassword(oldPassword, user.password))) throw new ForbiddenError();

    const newHashedPassword = await hashPassword(newPassword);
    await userRepository.update(req.authUser.id, { password: newHashedPassword });

    reply.code(204).send();
  };

  public deleteUser = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = await userRepository.findById(req.authUser.id);

    await userRepository.delete(req.authUser.id);

    if (user.ownerId) await sampleStorageService.deleteDirectory(user.ownerId);
    await avatarStorageService.remove(req.authUser.id);

    reply.code(204).send();
  };

  public listProducers = async (
    _req: FastifyRequest<ListProducersRoute>,
    reply: FastifyReply<ListProducersRoute>,
  ): Promise<void> => {
    const producers = await userRepository.listPublic();
    reply.code(200).send({ producers });
  };

  public getProfile = async (
    req: FastifyRequest<GetProfileRoute>,
    reply: FastifyReply<GetProfileRoute>,
  ): Promise<void> => {
    const producer = await userRepository.findProfileByHandle(req.params.handle, req.authUser.id);
    reply.code(200).send({ producer });
  };

  public listFollowers = async (
    req: FastifyRequest<ListFollowRoute>,
    reply: FastifyReply<ListFollowRoute>,
  ): Promise<void> => {
    const producers = await userRepository.listFollowers(req.params.handle);
    reply.code(200).send({ producers });
  };

  public listFollowing = async (
    req: FastifyRequest<ListFollowRoute>,
    reply: FastifyReply<ListFollowRoute>,
  ): Promise<void> => {
    const producers = await userRepository.listFollowing(req.params.handle);
    reply.code(200).send({ producers });
  };

  public follow = async (req: FastifyRequest<FollowRoute>, reply: FastifyReply): Promise<void> => {
    const target = await userRepository.findProfileByHandle(req.params.handle, req.authUser.id);

    if (target.id === req.authUser.id) {
      throw new BadRequestError('Cannot self-follow');
    }

    await userRepository.follow(req.authUser.id, target.id);
    reply.code(204).send();
  };

  public unfollow = async (
    req: FastifyRequest<FollowRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    const target = await userRepository.findProfileByHandle(req.params.handle, req.authUser.id);

    if (target.id === req.authUser.id) {
      throw new BadRequestError('Cannot self-unfollow');
    }

    await userRepository.unfollow(req.authUser.id, target.id);
    reply.code(204).send();
  };

  public uploadAvatar = async (
    req: FastifyRequest,
    reply: FastifyReply<UploadAvatarRoute>,
  ): Promise<void> => {
    const data = await req.file({ limits: { fileSize: AVATAR_MAX_BYTES } });
    if (!data) throw new BadRequestError();

    let buffer: Buffer;
    try {
      buffer = await data.toBuffer();
    } catch (error) {
      req.log.error(error);
      throw new PayloadTooLargeError('Avatar file is too large');
    }

    const webp = await imageService.normalizeAvatar(buffer);
    await avatarStorageService.write(req.authUser.id, webp);

    const updatedUser = await userRepository.update(req.authUser.id, {
      avatarUpdatedAt: dayjs().toISOString(),
    });
    reply.code(201).send({ user: updatedUser });
  };

  public deleteAvatar = async (req: FastifyRequest, reply: FastifyReply) => {
    await avatarStorageService.remove(req.authUser.id);
    await userRepository.update(req.authUser.id, {
      avatarUpdatedAt: null,
    });

    reply.code(204).send();
  };

  public listUser = async (req: FastifyRequest<ListUser>, reply: FastifyReply<ListUser>) => {
    const ids = req.query.ids;
    if (!ids) {
      reply.code(200).send([]);
      return;
    }

    const users = await userRepository.get({ ids });
    if (!users) throw new NotFoundError('[listUser] users not found');
    reply.code(200).send(this._formatOnlineUser(users));
  };

  private _formatOnlineUser = (users: User[]): OnlineUser[] => {
    const onlineUsers: OnlineUser[] = [];

    users.forEach((user) => {
      onlineUsers.push({
        ...user,
        activity: 'producer',
        listeners: 0,
        name: user.artistName,
        status: 'online',
      });
    });
    return onlineUsers;
  };
}

export const userController = new UserController();
