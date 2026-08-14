import { createWriteStream } from 'node:fs';
import { mkdir, rm, unlink, writeFile } from 'node:fs/promises';
import path, { join } from 'node:path';
import type { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { PayloadTooLargeError } from '../domain/errors';

interface StoredFile {
  filePath: string;
  url: string;
}

class SampleStorageService {
  private readonly _samplesRoot: string;

  constructor(samplesRoot: string) {
    this._samplesRoot = samplesRoot;
  }

  public async write(uuid: string, ownerId: string, data: Buffer, ext?: 'wav' | 'peaks') {
    const { filePath } = this._path(uuid, ownerId, ext);
    await writeFile(filePath, data);
  }

  public async writeStream(
    uuid: string,
    ownerId: string,
    stream: Readable & { truncated?: boolean },
  ): Promise<StoredFile> {
    const { dir, filePath } = this._path(uuid, ownerId, 'wav');

    await mkdir(dir, { recursive: true });

    try {
      await pipeline(stream, createWriteStream(filePath));
    } catch (error) {
      await this.remove(uuid, ownerId);
      throw error;
    }

    if (stream.truncated) {
      await this.remove(uuid, ownerId);
      throw new PayloadTooLargeError('Maximum file size reached');
    }

    return { filePath, url: `${ownerId}/${uuid}.wav` };
  }

  public async remove(uuid: string, ownerId: string): Promise<void> {
    for (const ext of ['wav', 'peaks'] as const) {
      try {
        const { filePath } = this._path(uuid, ownerId, ext);
        await unlink(filePath);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async deleteDirectory(ownerId: string): Promise<void> {
    const dir = path.join(this._samplesRoot, ownerId);
    await rm(dir, { force: true, recursive: true });
  }

  private _path(uuid: string, ownerId: string, ext?: 'wav' | 'peaks') {
    const dir = path.join(this._samplesRoot, ownerId);
    const filePath = path.join(dir, `${uuid}.${ext ?? 'wav'}`);
    return { dir, filePath };
  }
}

export const sampleStorageService = new SampleStorageService(
  join(process.env.MEDIA_ROOT ?? '/var/www/media', 'samples'),
);
