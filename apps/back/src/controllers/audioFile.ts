import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import type { Key, Visibility } from '../domain/audioFile';
import { NotFoundError } from '../domain/errors';
import { InternalServerError } from '../domain/errors';
import { audioFileRepository } from '../repositories/audioFile';
import { ownerRepositoty } from '../repositories/owner';
import { userRepository } from '../repositories/user';

interface GetAudioFilesRoute extends RouteGenericInterface {
  Querystring: {
    userId: string;
    ids: string[];
    bpms: number[];
    keys: Key[];
    visibilities: Visibility[];
  };
}

class AudioFileController {
  public get = async (req: FastifyRequest<GetAudioFilesRoute>, reply: FastifyReply) => {
    const userId = req.authUser.id;

    const platformOwnerID = (await ownerRepositoty.get('PLATEFORM')).id;

    if (!platformOwnerID) throw new NotFoundError();

    const userOwnerID = (await userRepository.findById(userId)).ownerId;
    if (!userOwnerID) throw new InternalServerError();

    const ownerIds = [platformOwnerID, userOwnerID];

    const audio = await audioFileRepository.get({
      ownerIds,
      ...req.query,
    });
    reply.code(200).send(audio);
  };
}

export const audioFileController = new AudioFileController();
