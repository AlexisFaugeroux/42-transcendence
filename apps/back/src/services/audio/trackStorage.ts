import { join } from 'node:path';
import { AudioStorageService } from './audioStorage';

class TrackStorageService extends AudioStorageService {}

export const trackStorageService = new TrackStorageService(
  join(process.env.MEDIA_ROOT ?? '/var/www/media', 'tracks'),
);
