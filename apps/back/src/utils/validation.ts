import type { Key, UploadAudioFileFields } from '../domain/audioFile';
import { BadRequestError } from '../domain/errors';
import { Key as KeyEnum, VisibilityType as VisibilityEnum } from '../generated/prisma/enums';

const visibilityMap: Record<string, VisibilityEnum> = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  SHARED: 'SHARED',
} as const;

const keyMap: Record<string, KeyEnum> = {
  A_key: 'A_key',
  B_key: 'B_key',
  C_key: 'C_key',
  D_key: 'D_key',
  E_key: 'E_key',
  F_key: 'F_key',
  G_key: 'G_key',
};

export function parseUploadAudioFileFields(fields: Record<string, unknown>): UploadAudioFileFields {
  const raw = (name: string): string | undefined => {
    const f = fields[name];
    if (f && typeof f === 'object' && 'value' in f && typeof f.value === 'string') return f.value;
    return undefined;
  };

  const visibility = raw('visibility');
  if (!visibility || !Object.values(VisibilityEnum).includes(visibilityMap[visibility])) {
    throw new BadRequestError(`Invalid visibility: ${visibility ?? 'missing'}`);
  }

  const bpmRaw = raw('bpm');
  let bpm: number | undefined;
  if (bpmRaw !== undefined) {
    const n = Number(bpmRaw);
    if (!Number.isInteger(n) || n <= 0) throw new BadRequestError(`Invalid bpm: ${bpmRaw}`);
    bpm = n;
  }

  const keyRaw = raw('key');
  let key: Key | undefined;
  if (keyRaw !== undefined) {
    if (!Object.values(KeyEnum).includes(keyMap[keyRaw])) throw new BadRequestError(`Invalid key: ${keyRaw}`);
    key = keyRaw as Key;
  }

  return { bpm, key, visibility: visibilityMap[visibility] };
}
