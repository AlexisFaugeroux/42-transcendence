import type { Family, Key, Kind, Mode, UploadAudioFileFields, Visibility } from '../domain/audioFile';
import { BadRequestError } from '../domain/errors';
import {
  AudioFileKind as KindEnum,
  Family as FamilyEnum,
  Key as KeyEnum,
  Mode as ModeEnum,
  VisibilityType as VisibilityEnum,
} from '../generated/prisma/enums';

const visibilityMap: Record<string, VisibilityEnum> = { ...VisibilityEnum };
const keyMap: Record<string, KeyEnum> = { ...KeyEnum };
const modeMap: Record<string, ModeEnum> = { ...ModeEnum };
const familyMap: Record<string, FamilyEnum> = { ...FamilyEnum };
const kindMap: Record<string, KindEnum> = { ...KindEnum };

const isVisibility = (value: string): value is Visibility =>
  Object.values(VisibilityEnum).includes(visibilityMap[value]);
const isKey = (value: string): value is Key => Object.values(KeyEnum).includes(keyMap[value]);
const isMode = (value: string): value is Mode => Object.values(ModeEnum).includes(modeMap[value]);
const isFamily = (value: string): value is Family => Object.values(FamilyEnum).includes(familyMap[value]);
const isKind = (value: string): value is Kind => Object.values(KindEnum).includes(kindMap[value]);

export function parseUploadAudioFileFields(fields: Record<string, unknown>): UploadAudioFileFields {
  const raw = (name: string): string | undefined => {
    const f = fields[name];
    if (f && typeof f === 'object' && 'value' in f && typeof f.value === 'string') return f.value;
    return undefined;
  };

  const visibility = raw('visibility');
  if (!visibility || !isVisibility(visibility)) {
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
    if (!isKey(keyRaw)) throw new BadRequestError(`Invalid key: ${keyRaw}`);
    key = keyRaw;
  }

  const modeRaw = raw('mode');
  let mode: Mode | undefined;
  if (modeRaw !== undefined) {
    if (!isMode(modeRaw)) throw new BadRequestError(`Invalid mode: ${modeRaw}`);
    mode = modeRaw;
  }

  const familyRaw = raw('family');
  let family: Family | undefined;
  if (familyRaw !== undefined) {
    if (!isFamily(familyRaw)) throw new BadRequestError(`Invalid family: ${familyRaw}`);
    family = familyRaw;
  }

  const kindRaw = raw('kind');
  let kind: Kind | undefined;
  if (kindRaw !== undefined) {
    if (!isKind(kindRaw)) throw new BadRequestError(`Invalid kind: ${kindRaw}`);
    kind = kindRaw;
  }

  return { bpm, family, key, kind, mode, visibility };
}
