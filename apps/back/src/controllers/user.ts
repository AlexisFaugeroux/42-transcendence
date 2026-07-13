import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { userRepository } from '../repositories/user';
import { hashPassword, verifyPassword } from '../utils/password';
import { ForbiddenError } from '../domain/errors';
import type { UpdateUserInput, UserResponse } from '../domain/user';
import { audioStorageService } from '../services/audioStorage';

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

class UserController {
  public updateProfile = async (
    req: FastifyRequest<UpdateProfileRoute>,
    reply: FastifyReply<UpdateProfileRoute>,
  ): Promise<void> => {
    const updatedUser = await userRepository.update(req.authUser.id, req.body);

    reply.code(200).send({ user: updatedUser });
  };

  public updatePassword = async (req: FastifyRequest<UpdatePasswordRoute>, reply: FastifyReply): Promise<void> => {
    const { oldPassword, newPassword } = req.body;

    const user = await userRepository.findById(req.authUser.id);

    if (!(await verifyPassword(oldPassword, user.password))) throw new ForbiddenError();

    const newHashedPassword = await hashPassword(newPassword);
    await userRepository.update(req.authUser.id, { password: newHashedPassword });

    reply.code(204).send();
  };

  public deleteUser = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = await userRepository.findById(req.authUser.id);

    await userRepository.delete(req.authUser.id);

    if (user.ownerId) await audioStorageService.deleteDirectory(user.ownerId);

    reply.code(204).send();
  };
}

export const userController = new UserController();
