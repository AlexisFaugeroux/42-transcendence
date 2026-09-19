import type { FastifyReply, FastifyRequest } from 'fastify';
import { dayjs } from '@transcendence/date';
import { AVATAR_MAX_BYTES } from '../../constants';
import { BadRequestError, ForbiddenError, PayloadTooLargeError } from '../../domain/errors';
import type { UserOnlineStatus } from '../../domain/user';
import { userRepository } from '../../repositories/user/user';
import { sampleStorageService } from '../../services/audio/sampleStorage';
import { trackStorageService } from '../../services/audio/trackStorage';
import { avatarStorageService } from '../../services/avatarStorage';
import { imageService } from '../../services/imageService';
import { parsePagination, toPaginatedResponse } from '../../utils/pagination';
import { hashPassword, verifyPassword } from '../../utils/password';
import { webSocketRegistry } from '../../utils/websockets';
import { formatUserWithOnlineStatus } from './helpers';
import type {
  FollowRoute,
  GetProfileRoute,
  ListFollowingUsers,
  ListFollowProducersRoute,
  ListProducersRoute,
  UpdatePasswordRoute,
  UpdateProfileRoute,
  UploadAvatarRoute,
} from './types';

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

    const user = await userRepository.findWithPassword({ id: req.authUser.id });

    if (!(await verifyPassword(oldPassword, user.password))) throw new ForbiddenError();

    const newHashedPassword = await hashPassword(newPassword);
    await userRepository.update(req.authUser.id, { password: newHashedPassword });

    reply.code(204).send();
  };

  public deleteUser = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = await userRepository.find({ id: req.authUser.id });

    await userRepository.delete(req.authUser.id);

    await sampleStorageService.deleteDirectory(user.ownerId);
    await trackStorageService.deleteDirectory(user.ownerId);
    await avatarStorageService.remove(user.ownerId);

    reply.code(204).send();
  };

  public listProducers = async (
    req: FastifyRequest<ListProducersRoute>,
    reply: FastifyReply<ListProducersRoute>,
  ): Promise<void> => {
    const pagination = parsePagination(req.query.page, req.query.limit);
    const skip = pagination.unpaginated ? undefined : pagination.skip;
    const take = pagination.unpaginated ? undefined : pagination.take;

    const { items, total } = await userRepository.listPublic(skip, take, req.query.q);

    reply.code(200).send(toPaginatedResponse(pagination, items, total));
  };

  public getProfile = async (
    req: FastifyRequest<GetProfileRoute>,
    reply: FastifyReply<GetProfileRoute>,
  ): Promise<void> => {
    const producer = await userRepository.findProfile(
      { handle: req.params.handle },
      req.authUser.id,
    );

    reply.code(200).send({ producer });
  };

  public listFollowerProducers = async (
    req: FastifyRequest<ListFollowProducersRoute>,
    reply: FastifyReply<ListFollowProducersRoute>,
  ): Promise<void> => {
    const pagination = parsePagination(req.query.page, req.query.limit);
    const skip = pagination.unpaginated ? undefined : pagination.skip;
    const take = pagination.unpaginated ? undefined : pagination.take;

    const { items, total } = await userRepository.listFollowers(
      { handle: req.params.handle },
      { skip, take, q: req.query.q },
    );

    reply.code(200).send(toPaginatedResponse(pagination, items, total));
  };

  public listFollowersById = async (
    req: FastifyRequest<ListFollowingUsers>,
    reply: FastifyReply<ListFollowingUsers>,
  ) => {
    const userId = req.authUser.id;
    const { items } = await userRepository.listFollowers({ id: userId });
    if (items.length === 0) {
      reply.code(200).send([]);
      return;
    }

    const userIds = items.map((i) => i.id);
    const { items: users } = await userRepository.get({ ids: userIds });

    const response: UserOnlineStatus[] = users.map((user) => {
      const isOnline = webSocketRegistry.isOnline(user.id);

      return {
        ...formatUserWithOnlineStatus(user),
        status: isOnline ? 'online' : 'offline',
      };
    });

    reply.code(200).send(response);
  };

  public listFollowing = async (
    req: FastifyRequest<ListFollowProducersRoute>,
    reply: FastifyReply<ListFollowProducersRoute>,
  ): Promise<void> => {
    const pagination = parsePagination(req.query.page, req.query.limit);
    const skip = pagination.unpaginated ? undefined : pagination.skip;
    const take = pagination.unpaginated ? undefined : pagination.take;

    const { items, total } = await userRepository.listFollowing(
      { handle: req.params.handle },
      { skip, take, q: req.query.q },
    );

    reply.code(200).send(toPaginatedResponse(pagination, items, total));
  };

  public follow = async (req: FastifyRequest<FollowRoute>, reply: FastifyReply): Promise<void> => {
    const { id: userId } = req.authUser;

    const target = await userRepository.findProfile({ handle: req.params.handle }, userId);
    if (target.id === userId) {
      throw new BadRequestError('Cannot self-follow');
    }

    await userRepository.follow(userId, target.id);

    if (webSocketRegistry.isOnline(target.id)) {
      webSocketRegistry.sendToUsers([userId], { data: [target.id], event: 'producerFollowed' });
    }

    reply.code(204).send();
  };

  public unfollow = async (
    req: FastifyRequest<FollowRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { id: userId } = req.authUser;

    const target = await userRepository.findProfile({ handle: req.params.handle }, userId);
    if (target.id === userId) {
      throw new BadRequestError('Cannot self-unfollow');
    }

    await userRepository.unfollow(userId, target.id);

    if (webSocketRegistry.isOnline(target.id)) {
      webSocketRegistry.sendToUsers([userId], { data: [target.id], event: 'producerUnfollowed' });
    }

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

    const { ownerId } = await userRepository.find({ id: req.authUser.id });
    const webp = await imageService.normalizeAvatar(buffer);
    await avatarStorageService.write(ownerId, webp);

    const updatedUser = await userRepository.update(req.authUser.id, {
      avatarUpdatedAt: dayjs().toISOString(),
    });

    reply.code(200).send({ user: updatedUser });
  };

  public deleteAvatar = async (req: FastifyRequest, reply: FastifyReply) => {
    const { ownerId } = await userRepository.find({ id: req.authUser.id });
    await avatarStorageService.remove(ownerId);
    await userRepository.update(req.authUser.id, {
      avatarUpdatedAt: null,
    });

    reply.code(204).send();
  };

  public listFollowingById = async (
    req: FastifyRequest<ListFollowingUsers>,
    reply: FastifyReply<ListFollowingUsers>,
  ) => {
    const userId = req.authUser.id;
    const { items } = await userRepository.listFollowing({ id: userId });
    if (items.length === 0) {
      reply.code(200).send([]);
      return;
    }

    const userIds = items.map((i) => i.id);
    const { items: users } = await userRepository.get({ ids: userIds });

    const response: UserOnlineStatus[] = users.map((user) => {
      const isOnline = webSocketRegistry.isOnline(user.id);

      return {
        ...formatUserWithOnlineStatus(user),
        status: isOnline ? 'online' : 'offline',
      };
    });

    reply.code(200).send(response);
  };
}

export const userController = new UserController();
