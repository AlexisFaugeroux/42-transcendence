import type { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { MAX_UPLOAD_BYTES, SAMPLE_USER_QUOTA_BYTES } from '../../constants';
import { BadRequestError, ForbiddenError, PayloadTooLargeError } from '../../domain/errors';
import { ownerRepository } from '../../repositories/owner/owner';
import { sampleRepository } from '../../repositories/sample/sample';
import { userRepository } from '../../repositories/user/user';
import { sampleStorageService } from '../../services/audio/sampleStorage';
import { msnpManager } from '../../services/msnp';
import { type WavInfo, wavManager } from '../../services/wav';
import { parsePagination, toPaginatedResponse } from '../../utils/pagination';
import { parseUploadSampleFields } from '../../utils/validation';
import type {
  DeleteSampleRoute,
  GetSamplesRoute,
  StorageSampleRoute,
  UpdateSampleRoute,
  UploadSampleRoute,
} from './types';

class SampleFileController {
  public get = async (
    req: FastifyRequest<GetSamplesRoute>,
    reply: FastifyReply<GetSamplesRoute>,
  ): Promise<void> => {
    const userId = req.authUser.id;

    const platformOwnerID = (await ownerRepository.get('PLATEFORM')).id;

    const userOwnerID = (await userRepository.find({ id: userId })).ownerId;

    const ownerIds = [platformOwnerID, userOwnerID];

    const { page: pageRaw, limit: limitRaw, q, ...filters } = req.query;
    const pagination = parsePagination(pageRaw, limitRaw);
    const skip = pagination.unpaginated ? undefined : pagination.skip;
    const take = pagination.unpaginated ? undefined : pagination.take;

    const { items, total } = await sampleRepository.get({ ownerIds, ...filters }, skip, take, q);

    reply.code(200).send(toPaginatedResponse(pagination, items, total));
  };

  public storage = async (
    req: FastifyRequest<StorageSampleRoute>,
    reply: FastifyReply<StorageSampleRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.find({ id: req.authUser.id });

    const [usedBytes, byFamily] = await Promise.all([
      sampleRepository.sumBytes(ownerId),
      sampleRepository.sumBytesByFamily(ownerId),
    ]);

    reply.code(200).send({
      byFamily,
      maxUploadBytes: MAX_UPLOAD_BYTES,
      quotaBytes: SAMPLE_USER_QUOTA_BYTES,
      usedBytes,
    });
  };

  public upload = async (
    req: FastifyRequest<UploadSampleRoute>,
    reply: FastifyReply<UploadSampleRoute>,
  ): Promise<void> => {
    const { ownerId } = await userRepository.find({ id: req.authUser.id });

    const data = await req.file();
    if (!data) throw new BadRequestError();

    const fields = parseUploadSampleFields(data.fields);

    const uuid = randomUUID();

    // Write streamed file on disk
    const { filePath, url } = await sampleStorageService.writeStream(uuid, ownerId, data.file);

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
        await sampleStorageService.write(uuid, ownerId, peaks, 'peaks');
      } else console.warn(`Missing peaks from ${uuid}, could not generate .peaks file`);

      // Check user quota
      const usedBytes = await sampleRepository.sumBytes(ownerId);
      if (usedBytes + info.size > SAMPLE_USER_QUOTA_BYTES) {
        throw new PayloadTooLargeError(`Maximum storage capacity reached`);
      }

      const uploadedFile = await sampleRepository.create({
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
      await sampleStorageService.remove(uuid, ownerId);
      throw error;
    }
  };

  public update = async (
    req: FastifyRequest<UpdateSampleRoute>,
    reply: FastifyReply<UpdateSampleRoute>,
  ): Promise<void> => {
    if (!Object.keys(req.body).length) throw new BadRequestError('No field to update');

    const user = await userRepository.find({ id: req.authUser.id });
    const sample = await sampleRepository.findById(req.query.id);

    if (sample.ownerId !== user.ownerId) throw new ForbiddenError();

    const updated = await sampleRepository.update(req.query.id, req.body);

    reply.code(200).send(updated);
  };

  public delete = async (
    req: FastifyRequest<DeleteSampleRoute>,
    reply: FastifyReply,
  ): Promise<void> => {
    const user = await userRepository.find({ id: req.authUser.id });
    const sample = await sampleRepository.findById(req.query.id);

    if (sample.ownerId !== user.ownerId) throw new ForbiddenError();

    await sampleStorageService.remove(sample.id, user.ownerId);

    await sampleRepository.delete(req.query.id);

    reply.code(204).send();
  };
}

export const sampleController = new SampleFileController();
