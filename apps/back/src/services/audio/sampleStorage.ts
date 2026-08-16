import { join } from 'node:path';
import { AudioStorageService } from './audioStorage';

class SampleStorageService extends AudioStorageService {}

export const sampleStorageService = new SampleStorageService(
  join(process.env.MEDIA_ROOT ?? '/var/www/media', 'samples'),
);
