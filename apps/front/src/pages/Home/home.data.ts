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
}

export const SESSION_TYPES: SessionType[] = [
  {
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

// Placeholder rows until the sessions endpoint lands: titles, keys and relative
// times are sample content, not UI copy, so they are not translated.

export type PresenceStatus = 'live' | 'online' | 'idle' | 'offline';

export interface OnlineUser {
  name: string;
  handle: string;
  status: PresenceStatus;
  activity: string;
  listeners: number;
}

// Same as SAVED_SESSIONS: sample presence rows, replaced by the social endpoint.
export const ONLINE: OnlineUser[] = [
  {
    activity: 'Recording vocals',
    handle: '@maya.o',
    listeners: 12,
    name: 'Maya Okafor',
    status: 'live',
  },
  {
    activity: 'Mixing — Side B',
    handle: '@theo',
    listeners: 0,
    name: 'Theo Rivera',
    status: 'online',
  },
  {
    activity: 'Producing — 92 BPM',
    handle: '@anouk',
    listeners: 0,
    name: 'Anouk Lemaire',
    status: 'online',
  },
  {
    activity: 'Streaming a beat set',
    handle: '@idris',
    listeners: 47,
    name: 'Idris Khan',
    status: 'live',
  },
  {
    activity: 'Browsing samples',
    handle: '@rosa',
    listeners: 0,
    name: 'Rosa Petrov',
    status: 'idle',
  },
  {
    activity: 'Mastering single',
    handle: '@junpark',
    listeners: 0,
    name: 'Jun Park',
    status: 'online',
  },
  {
    activity: 'Live drum jam',
    handle: '@cleo.b',
    listeners: 8,
    name: 'Cleo Banner',
    status: 'live',
  },
  {
    activity: 'Playlist: late night',
    handle: '@samwest',
    listeners: 0,
    name: 'Sam West',
    status: 'online',
  },
];

export interface ActivityItem {
  who: string;
  did: string;
  what: string;
  when: string;
}

// Same as SAVED_SESSIONS: sample feed rows, replaced by the activity endpoint.
export const ACTIVITY: ActivityItem[] = [
  { did: 'liked', what: 'your track “Liquid Drum 808”', when: '3m', who: 'Maya Okafor' },
  { did: 'commented', what: 'on “Tape Saturator demo”', when: '12m', who: 'Theo Rivera' },
  { did: 'added', what: 'you to “Friday Lab” playlist', when: '1h', who: 'Anouk Lemaire' },
  { did: 'started', what: 'a live mixing session', when: '2h', who: 'Idris Khan' },
  { did: 'followed', what: 'you back', when: '5h', who: 'Cleo Banner' },
];

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
