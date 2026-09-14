import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path, { join } from 'node:path';

class AvatarStorageService {
  private readonly _avatarsRoot: string;

  constructor(avatarsRoot: string) {
    this._avatarsRoot = avatarsRoot;
  }

  public async write(ownerId: string, data: Buffer): Promise<string> {
    await mkdir(this._avatarsRoot, { recursive: true });
    const filePath = path.join(this._avatarsRoot, `${ownerId}.webp`);
    await writeFile(filePath, data);
    return `${ownerId}.webp`;
  }

  public async remove(userId: string): Promise<void> {
    const filePath = path.join(this._avatarsRoot, `${userId}.webp`);
    try {
      await unlink(filePath);
    } catch (error) {
      console.log(error);
    }
  }
}

export const avatarStorageService = new AvatarStorageService(
  join(process.env.MEDIA_ROOT ?? '/var/www/media', 'avatars'),
);
