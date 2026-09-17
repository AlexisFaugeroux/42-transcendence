import type { TranslationKey } from '@transcendence/i18n';
import { theme } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';

export type SessionType = 'PRODUCE' | 'RECORD' | 'MIX';

export interface Session {
  id: string;
  state: string;
  samples: string[];
  name: string;
  cover?: string | null;
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

export const TYPE_COLOR: Record<SessionType, string> = {
  MIX: theme.blue,
  PRODUCE: theme.orange,
  RECORD: theme.red,
};

export const TYPE_ICON: Record<SessionType, MsnIconLabel> = {
  MIX: 'mix',
  PRODUCE: 'produce',
  RECORD: 'record',
};

export const TYPE_LABEL: Record<SessionType, TranslationKey> = {
  MIX: 'sessions.type.mixing',
  PRODUCE: 'sessions.type.production',
  RECORD: 'sessions.type.recording',
};

export const TYPE_DESCRIPTION: Record<SessionType, TranslationKey> = {
  MIX: 'sessions.typeDescription.mixing',
  PRODUCE: 'sessions.typeDescription.production',
  RECORD: 'sessions.typeDescription.recording',
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
