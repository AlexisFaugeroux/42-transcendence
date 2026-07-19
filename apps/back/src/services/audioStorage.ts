import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdir, rm, unlink } from 'node:fs/promises';
import path from 'node:path';
import type { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { PayloadTooLargeError } from '../domain/errors';

interface StoredFile {
  uuid: string;
  filePath: string;
  url: string;
}

class AudioStorageService {
  private readonly audioRoot: string;

  constructor(audioRoot: string) {
    this.audioRoot = audioRoot;
  }

  public async writeStream(ownerId: string, stream: Readable & { truncated?: boolean }): Promise<StoredFile> {
    const uuid = randomUUID();
    const dir = path.join(this.audioRoot, ownerId);
    const filePath = path.join(dir, `${uuid}.wav`);

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

    return { filePath, url: `${ownerId}/${uuid}.wav`, uuid };
  }

  public async remove(uuid: string, ownerId: string): Promise<void> {
    const dir = path.join(this.audioRoot, ownerId);
    const filePath = path.join(dir, `${uuid}.wav`);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteDirectory(ownerId: string): Promise<void> {
    const dir = path.join(this.audioRoot, ownerId);
    await rm(dir, { force: true, recursive: true });
  }
}

export const audioStorageService = new AudioStorageService(process.env.AUDIO_ROOT ?? '/var/www/audio');
