import type { TranslationKey } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';

export type SessionType = 'production' | 'recording' | 'mixing';

export interface Session {
  id: string;
  state: string;
  samples: string[];
  name: string;
  ownerId: string;
  duration: number;
  bpm: number;
  key?: string;
  mode?: string;
  type: SessionType;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export const SESS_TYPES: SessionType[] = ['production', 'recording', 'mixing'];
export const SESS_GENRES = [
  'house',
  'ambient',
  'drum&bass',
  'hip-hop',
  'techno',
  'indie',
  'lo-fi',
  'experimental',
  'vocal',
];

// The three session types map onto brand hues — reference the theme, don't restate raw hsl().
export const TYPE_COLOR: Record<SessionType, string> = {
  mixing: theme.blue,
  production: theme.orange,
  recording: theme.red,
};

export const TYPE_ICON: Record<SessionType, MsnIconLabel> = {
  mixing: 'mix',
  production: 'produce',
  recording: 'record',
};

export const TYPE_LABEL: Record<SessionType, TranslationKey> = {
  mixing: 'sessions.type.mixing',
  production: 'sessions.type.production',
  recording: 'sessions.type.recording',
};

export const TYPE_DESCRIPTION: Record<SessionType, TranslationKey> = {
  mixing: 'sessions.typeDescription.mixing',
  production: 'sessions.typeDescription.production',
  recording: 'sessions.typeDescription.recording',
};

export type SessSort = 'edited' | 'name' | 'bpm';

export const SORT_LABEL: Record<SessSort, TranslationKey> = {
  bpm: 'sessions.sort.bpm',
  edited: 'sessions.sort.edited',
  name: 'sessions.sort.name',
};

export function formatSize(mb: number, locale: string): string {
  const format = (value: number, digits: number): string =>
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }).format(value);

  if (mb >= 1024) return `${format(mb / 1024, 2)} GB`;
  return `${format(mb, 1)} MB`;
}
