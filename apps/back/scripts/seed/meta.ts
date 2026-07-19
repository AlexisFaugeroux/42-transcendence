import { AudioFileKind, Family } from '../../src/generated/prisma/enums';

export interface SampleMeta {
  family: Family | null;
  kind: AudioFileKind;
  bpm: number | null;
}

// Familles reconnaissables dans un nom de fichier, du plus spécifique au plus
// générique (le premier qui matche gagne). Un nom non reconnu -> family null.
const FAMILY_PATTERNS: [RegExp, Family][] = [
  [/kick/i, Family.KICK],
  [/snare/i, Family.SNARE],
  [/clap/i, Family.CLAP],
  [/tom/i, Family.TOM],
  [/cymbal|ride|crash/i, Family.CYMBAL],
  [/\bhh\b|hat/i, Family.HAT],
  [/perc/i, Family.PERC],
  [/ambience|ambient|atmo/i, Family.AMBIENCE],
  [/\bfx\b|effect|riser|sweep/i, Family.FX],
  [/\bsub\b|bass/i, Family.BASS],
  [/synth/i, Family.SYNTH],
  [/lead/i, Family.LEAD],
  [/\bpad\b/i, Family.PAD],
  [/keys|piano|rhodes/i, Family.KEYS],
  [/pluck/i, Family.PLUCK],
  [/string/i, Family.STRINGS],
  [/brass|horn|trumpet|sax/i, Family.BRASS],
  [/vocal|\bvox\b|voice/i, Family.VOCAL],
];

export function deriveSampleMeta(filename: string): SampleMeta {
  const base = filename.replace(/\.wav$/i, '');

  const isLoop = /\bloop\b/i.test(base) || /\bbpm\b/i.test(base) || /\d\s*bpm/i.test(base);
  const kind = isLoop ? AudioFileKind.LOOP : AudioFileKind.ONE_SHOT;

  const bpmMatch = /(\d{2,3})\s*bpm/i.exec(base) ?? /loop\D*(\d{2,3})/i.exec(base);
  const bpm = bpmMatch ? Number(bpmMatch[1]) : null;

  const family = FAMILY_PATTERNS.find(([pattern]) => pattern.test(base))?.[1] ?? null;

  return { bpm, family, kind };
}
