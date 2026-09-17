import type { TranslationKey } from '@transcendence/i18n';
import type { MsnIconLabel } from '@transcendence/ui';

export type SessionKind = 'recording' | 'production' | 'mixing';

export interface SessionType {
  key: string;
  titleKey: TranslationKey;
  blurbKey: TranslationKey;
  icon: MsnIconLabel;
  color: string;
  metaKeys: TranslationKey[];
  available: boolean;
}

export const SESSION_TYPES: SessionType[] = [
  {
    available: false,
    blurbKey: 'home.sessionTypes.record.blurb',
    color: 'hsl(8, 85%, 55%)',
    icon: 'record',
    key: 'record',
    metaKeys: [
      'home.sessionTypes.record.meta.multitrack',
      'home.sessionTypes.record.meta.monitor',
      'home.sessionTypes.record.meta.overdub',
    ],
    titleKey: 'home.sessionTypes.record.title',
  },
  {
    available: true,
    blurbKey: 'home.sessionTypes.produce.blurb',
    color: 'hsl(25, 90%, 55%)',
    icon: 'produce',
    key: 'produce',
    metaKeys: [
      'home.sessionTypes.produce.meta.beatMaker',
      'home.sessionTypes.produce.meta.loops',
      'home.sessionTypes.produce.meta.midi',
    ],
    titleKey: 'home.sessionTypes.produce.title',
  },
  {
    available: false,
    blurbKey: 'home.sessionTypes.mix.blurb',
    color: 'hsl(210, 90%, 50%)',
    icon: 'mix',
    key: 'mix',
    metaKeys: [
      'home.sessionTypes.mix.meta.strips',
      'home.sessionTypes.mix.meta.sends',
      'home.sessionTypes.mix.meta.export',
    ],
    titleKey: 'home.sessionTypes.mix.title',
  },
];

export interface SavedSession {
  id: number;
  title: string;
  kind: SessionKind;
  bpm: number | null;
  key: string | null;
  updated: string;
  duration: string;
}

export const KIND_COLOR: Record<SessionKind, string> = {
  mixing: 'hsl(210, 90%, 50%)',
  production: 'hsl(25, 90%, 55%)',
  recording: 'hsl(8, 85%, 55%)',
};

export const KIND_ICON: Record<SessionKind, MsnIconLabel> = {
  mixing: 'mix',
  production: 'produce',
  recording: 'record',
};

export const KIND_LABEL: Record<SessionKind, TranslationKey> = {
  mixing: 'home.kind.mixing',
  production: 'home.kind.production',
  recording: 'home.kind.recording',
};
