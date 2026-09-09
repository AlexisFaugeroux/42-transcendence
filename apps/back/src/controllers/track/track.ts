import type { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { BadRequestError, ForbiddenError } from '../../domain/errors';

import { trackRepository } from '../../repositories/track/track';
import { userRepository } from '../../repositories/user/user';
import { trackStorageService } from '../../services/audio/trackStorage';
import { msnpManager } from '../../services/msnp';
import { type WavInfo, wavManager } from '../../services/wav';
import { parseUploadTrackFields } from '../../utils/validation';
import type { DeleteTrackRoute, GetTracksRoute, UpdateTrackRoute, UploadTrackRoute } from './types';

class TrackFileController {
  public get = async (req: FastifyRequest<GetTracksRoute>, reply: FastifyReply): Promise<void> => {
    const viewerId = req.authUser.id;
    const { handle } = req.params;

    const target = handle
      ? { handles: [handle] }
      : { userIds: req.query.userIds?.length ? req.query.userIds : [viewerId] };

    const track = await trackRepository.get({
      ...req.query,
      ...target,
      viewerId,
    });

    reply.code(200).send(track);
  };

  public upload = async (
    req: FastifyRequest<UploadTrackRoute>,
    reply: FastifyReply<UploadTrackRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.find({ id: req.authUser.id });

    const data = await req.file();
    if (!data) throw new BadRequestError();

    const fields = parseUploadTrackFields(data.fields);

    const uuid = randomUUID();

    // Write streamed file on disk
    const { filePath, url } = await trackStorageService.writeStream(uuid, ownerId, data.file);

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
        await trackStorageService.write(uuid, ownerId, peaks, 'peaks');
      } else console.warn(`Missing peaks from ${uuid}, could not generate .peaks file`);

      const uploaded = await trackRepository.create({
        bpm: fields.bpm,
        bytes: info.size,
        description: fields.description,
        duration: info.durationMs,
        id: uuid,
        key: fields.key,
        mode: fields.mode,
        ownerId,
        projectId: fields.projectId,
        title: fields.title,
        url,
        visibility: fields.visibility,
      });

      reply.code(201).send(uploaded);
    } catch (error) {
      await trackStorageService.remove(uuid, ownerId);
      throw error;
    }
  };

  public update = async (
    req: FastifyRequest<UpdateTrackRoute>,
    reply: FastifyReply<UpdateTrackRoute>,
  ): Promise<void> => {
    if (!Object.keys(req.body).length) throw new BadRequestError('No field to update');

    const user = await userRepository.find({ id: req.authUser.id });
    const track = await trackRepository.findById(req.query.id);

    if (track.ownerId !== user.ownerId) throw new ForbiddenError();

    const updated = await trackRepository.update(req.query.id, req.body);

    reply.code(200).send(updated);
  };

  public delete = async (
    req: FastifyRequest<DeleteTrackRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    const user = await userRepository.find({ id: req.authUser.id });
    const track = await trackRepository.findById(req.query.id);

    if (track.ownerId !== user.ownerId) throw new ForbiddenError();

    await trackStorageService.remove(track.id, track.ownerId);

    await trackRepository.delete(req.query.id);

    reply.code(204).send();
  };
}

export const trackController = new TrackFileController();
