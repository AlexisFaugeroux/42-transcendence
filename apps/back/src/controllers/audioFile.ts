import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { randomUUID } from 'node:crypto';
import { AUDIO_USER_QUOTA_BYTES } from '../constants';
import type { AudioFile, AudioStorageUsage, GetAudioFileInput, UpdateAudioFileInput } from '../domain/audioFile';
import { BadRequestError, ForbiddenError, PayloadTooLargeError } from '../domain/errors';
import { audioFileRepository } from '../repositories/audioFile';
import { ownerRepository } from '../repositories/owner';
import { userRepository } from '../repositories/user';
import { audioStorageService } from '../services/audioStorage';
import { msnpManager } from '../services/msnp';
import { type WavInfo, wavManager } from '../services/wav';
import { parseUploadAudioFileFields } from '../utils/validation';

interface GetAudioFilesRoute extends RouteGenericInterface {
  Querystring: GetAudioFileInput;
}

interface UploadAudioFileRoute extends RouteGenericInterface {
  Reply: AudioFile;
}

interface StorageAudioFileRoute extends RouteGenericInterface {
  Reply: AudioStorageUsage;
}

interface UpdateAudioFileRoute extends RouteGenericInterface {
  Querystring: {
    id: string;
  };
  Body: UpdateAudioFileInput;
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

  public storage = async (
    req: FastifyRequest<StorageAudioFileRoute>,
    reply: FastifyReply<StorageAudioFileRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.findById(req.authUser.id);

    const [usedBytes, byFamily] = await Promise.all([
      audioFileRepository.sumBytes(ownerId),
      audioFileRepository.sumBytesByFamily(ownerId),
    ]);

    reply.code(200).send({ byFamily, quotaBytes: AUDIO_USER_QUOTA_BYTES, usedBytes });
  };

  public upload = async (
    req: FastifyRequest<UploadAudioFileRoute>,
    reply: FastifyReply<UploadAudioFileRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.findById(req.authUser.id);

    const data = await req.file();
    if (!data) throw new BadRequestError();

    const fields = parseUploadAudioFileFields(data.fields);

    const uuid = randomUUID();

    // Write streamed file on disk
    const { filePath, url } = await audioStorageService.writeStream(uuid, ownerId, data.file);

    // Parse from file on disk
    try {
      let info: WavInfo;
      try {
        info = await wavManager.decodeWav(filePath, { channelData: true });
      } catch (error) {
        req.log.error(error);
        throw new BadRequestError(`invalid .wav file`);
      }

      // Write .peaks file on disk
      if (info.channelData) {
        const peaks = msnpManager.generatePeaks(info.channelData);
        await audioStorageService.write(uuid, ownerId, peaks, 'peaks');
      } else console.warn(`Missing peaks from ${uuid}, could not generate .peaks file`);

      // Check user quota
      const usedBytes = await audioFileRepository.sumBytes(ownerId);
      if (usedBytes + info.size > AUDIO_USER_QUOTA_BYTES) {
        throw new PayloadTooLargeError(`Maximum storage capacity reached`);
      }

      const uploadedFile = await audioFileRepository.create({
        bpm: fields.bpm,
        bytes: info.size,
        duration: info.durationMs,
        family: fields.family,
        id: uuid,
        key: fields.key,
        kind: fields.kind,
        mode: fields.mode,
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

  public update = async (
    req: FastifyRequest<UpdateAudioFileRoute>,
    reply: FastifyReply<UpdateAudioFileRoute>,
  ): Promise<void> => {
    if (!Object.keys(req.body).length) throw new BadRequestError('No field to update');

    const user = await userRepository.findById(req.authUser.id);
    const audioFile = await audioFileRepository.findById(req.query.id);

    if (audioFile.ownerId !== user.ownerId) throw new ForbiddenError();

    const updatedFile = await audioFileRepository.update(req.query.id, req.body);

    reply.code(200).send(updatedFile);
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
