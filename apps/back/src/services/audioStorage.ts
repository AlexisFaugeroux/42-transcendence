import { rm } from 'fs/promises';
import path from 'path';

class AudioStorageService {
  private readonly audioRoot: string;

  constructor(audioRoot: string) {
    this.audioRoot = audioRoot;
  }

  public async deleteDirectory(ownerId: string): Promise<void> {
    const dir = path.join(this.audioRoot, ownerId);
    await rm(dir, { force: true, recursive: true });
  }
}

export const audioStorageService = new AudioStorageService(process.env.AUDIO_ROOT ?? '/var/www/audio');
