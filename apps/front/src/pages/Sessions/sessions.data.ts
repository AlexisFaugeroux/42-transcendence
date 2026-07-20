import { theme } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';

export type SessionType = 'production' | 'recording' | 'mixing';

export interface Session {
  id: number;
  title: string;
  type: SessionType;
  bpm: number | null;
  key: string | null;
  edited: string;
  editedAt: string; // sortable "YYYY-MM-DD HH:mm"
  size: number; // MB
  tags: string[];
  seed: string;
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

export const SESSIONS: Session[] = [
  {
    archived: false,
    bpm: 142,
    edited: '2h ago',
    editedAt: '2026-05-06 13:14',
    id: 1,
    key: 'F min',
    seed: 'liquid808',
    size: 142.6,
    tags: ['drum&bass', 'liquid'],
    title: 'Liquid Drum 808',
    type: 'production',
  },
  {
    archived: false,
    bpm: 96,
    edited: 'yesterday',
    editedAt: '2026-05-05 22:01',
    id: 2,
    key: 'A min',
    seed: 'tapesat',
    size: 84.2,
    tags: ['lo-fi', 'mix'],
    title: 'Tape Saturator demo',
    type: 'mixing',
  },
  {
    archived: false,
    bpm: 88,
    edited: '3d ago',
    editedAt: '2026-05-03 10:42',
    id: 3,
    key: 'C maj',
    seed: 'vocal4',
    size: 46.8,
    tags: ['vocal', 'indie'],
    title: 'Vocal Take 04',
    type: 'recording',
  },
  {
    archived: false,
    bpm: 110,
    edited: '1w ago',
    editedAt: '2026-04-29 18:07',
    id: 4,
    key: 'D# min',
    seed: 'granular',
    size: 226.1,
    tags: ['ambient', 'texture'],
    title: 'Granular Pads',
    type: 'production',
  },
  {
    archived: false,
    bpm: 128,
    edited: '1w ago',
    editedAt: '2026-04-28 23:18',
    id: 5,
    key: 'G min',
    seed: 'latenight',
    size: 118.3,
    tags: ['house', 'late'],
    title: 'Late Night Bounce',
    type: 'mixing',
  },
  {
    archived: false,
    bpm: 120,
    edited: '2w ago',
    editedAt: '2026-04-22 16:00',
    id: 6,
    key: 'C maj',
    seed: 'firststeps',
    size: 58.7,
    tags: ['lo-fi', 'chill'],
    title: 'First Steps',
    type: 'production',
  },
  {
    archived: false,
    bpm: null,
    edited: '3w ago',
    editedAt: '2026-04-15 09:33',
    id: 7,
    key: null,
    seed: 'field2',
    size: 312.4,
    tags: ['experimental', 'field'],
    title: 'Field Recording 02',
    type: 'recording',
  },
  {
    archived: false,
    bpm: 134,
    edited: '4w ago',
    editedAt: '2026-04-08 12:10',
    id: 8,
    key: 'A min',
    seed: 'kickdrift',
    size: 72.0,
    tags: ['techno', 'drum'],
    title: 'Kick Drift',
    type: 'production',
  },
  {
    archived: false,
    bpm: 92,
    edited: '5w ago',
    editedAt: '2026-04-01 19:22',
    id: 9,
    key: 'E min',
    seed: 'sundown',
    size: 38.6,
    tags: ['lo-fi', 'hip-hop'],
    title: 'Sundown Loop',
    type: 'production',
  },
  {
    archived: true,
    bpm: 110,
    edited: 'Mar 12',
    editedAt: '2026-03-12 11:11',
    id: 10,
    key: 'D min',
    seed: 'demoCleo',
    size: 95.2,
    tags: ['mix'],
    title: 'Demo for Cleo',
    type: 'mixing',
  },
  {
    archived: true,
    bpm: null,
    edited: 'Feb 28',
    editedAt: '2026-02-28 20:00',
    id: 11,
    key: null,
    seed: 'oldVox',
    size: 28.1,
    tags: ['vocal'],
    title: 'Old Vocals Folder',
    type: 'recording',
  },
  {
    archived: true,
    bpm: 128,
    edited: 'Feb 03',
    editedAt: '2026-02-03 14:14',
    id: 12,
    key: 'F# min',
    seed: 'bday',
    size: 104.6,
    tags: ['hip-hop', 'gift'],
    title: 'Birthday Beat (final)',
    type: 'production',
  },
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

export function formatSize(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(1)} MB`;
}
