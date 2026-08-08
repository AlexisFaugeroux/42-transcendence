import sharp from 'sharp';
import { BadRequestError } from '../domain/errors';

class ImageService {
  private readonly _ALLOWED_AVATAR_FORMAT: ReadonlySet<string> = new Set(['jpeg', 'png', 'webp']);
  private readonly _AVATAR_SIZE = 256;

  public async normalizeAvatar(data: Buffer): Promise<Buffer> {
    const image = sharp(data);

    let format: string | undefined;
    try {
      ({ format } = await image.metadata());
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Invalid image file');
    }

    if (!format || !this._ALLOWED_AVATAR_FORMAT.has(format)) {
      throw new BadRequestError(`Unsupported image format: ${format ?? 'unknown'}`);
    }

    return image
      .rotate()
      .resize(this._AVATAR_SIZE, this._AVATAR_SIZE, { fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toBuffer();
  }
}

export const imageService = new ImageService();
