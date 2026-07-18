import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { AUDIO_USER_QUOTA_BYTES } from '../constants';
import type { AudioFile, GetAudioFileInput } from '../domain/audioFile';
import { BadRequestError, ForbiddenError, PayloadTooLargeError } from '../domain/errors';
import { audioFileRepository } from '../repositories/audioFile';
import { ownerRepository } from '../repositories/owner';
import { userRepository } from '../repositories/user';
import { parseUploadAudioFileFields } from '../utils/validation';
import { type ParsedWAVFile, parseWAV } from '../utils/wav';
import { audioStorageService } from '../services/audioStorage';

interface GetAudioFilesRoute extends RouteGenericInterface {
  Querystring: GetAudioFileInput;
}

interface UploadAudioFileRoute extends RouteGenericInterface {
  Reply: AudioFile;
}

interface DeleteAudioFileRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
}

class AudioFileController {
  public get = async (req: FastifyRequest<GetAudioFilesRoute>, reply: FastifyReply): Promise<void> => {
    const userId = req.authUser.id;

    const platformOwnerID = (await ownerRepository.get('PLATEFORM')).id;

    const userOwnerID = (await userRepository.findById(userId)).ownerId;

    const ownerIds = [platformOwnerID, userOwnerID];

    const audio = await audioFileRepository.get({
      ownerIds,
      ...req.query,
    });

    reply.code(200).send(audio);
  };

  public upload = async (
    req: FastifyRequest<UploadAudioFileRoute>,
    reply: FastifyReply<UploadAudioFileRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.findById(req.authUser.id);

    const data = await req.file();
    if (!data) throw new BadRequestError();

    const fields = parseUploadAudioFileFields(data.fields);

    // Write streamed file on disk
    const { filePath, url, uuid } = await audioStorageService.writeStream(ownerId, data.file);

    // Parse from file on disk
    try {
      let info: ParsedWAVFile;
      try {
        info = await parseWAV(filePath);
      } catch (error) {
        req.log.error(error);
        throw new BadRequestError(`invalid WAV file`);
      }

      // Check user quota
      const usedBytes = await audioFileRepository.sumBytes(ownerId);
      if (usedBytes + info.size > AUDIO_USER_QUOTA_BYTES) {
        throw new PayloadTooLargeError(`Maximum storage capacity reached`);
      }

      const uploadedFile = await audioFileRepository.create({
        bpm: fields.bpm,
        bytes: info.size,
        duration: info.durationMs,
        id: uuid,
        key: fields.key,
        name: data.filename,
        ownerId,
        url,
        visibility: fields.visibility,
      });

      reply.code(201).send(uploadedFile);
    } catch (error) {
      await audioStorageService.remove(uuid, ownerId);
      throw error;
    }
  };

  public delete = async (req: FastifyRequest<DeleteAudioFileRoute>, reply: FastifyReply): Promise<void> => {
    const user = await userRepository.findById(req.authUser.id);
    const audioFile = await audioFileRepository.findById(req.query.id);

    if (audioFile.ownerId !== user.ownerId) throw new ForbiddenError();

    await audioStorageService.remove(audioFile.id, user.ownerId);

    await audioFileRepository.delete(req.query.id);

    reply.code(204).send();
  };
}

export const audioFileController = new AudioFileController();
