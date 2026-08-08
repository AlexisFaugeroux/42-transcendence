import { mkdir, writeFile } from 'node:fs/promises';
import path, { join } from 'node:path';

class AvatarStorageService {
  private readonly _avatarsRoot: string;

  constructor(avatarsRoot: string) {
    this._avatarsRoot = avatarsRoot;
  }

  public async write(userId: string, data: Buffer): Promise<string> {
    await mkdir(this._avatarsRoot, { recursive: true });
    const filePath = path.join(this._avatarsRoot, `${userId}.webp`);
    await writeFile(filePath, data);
    return `${userId}.webp`;
  }
}

export const avatarStorageService = new AvatarStorageService(
  join(process.env.MEDIA_ROOT ?? '/var/www/media', 'avatars'),
);
