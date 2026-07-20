import type { MsnIconLabel } from '@transcendence/ui';

export type SessionKind = 'recording' | 'production' | 'mixing';

export interface SessionType {
  key: string;
  title: string;
  blurb: string;
  icon: MsnIconLabel;
  color: string;
  meta: string[];
}

export const SESSION_TYPES: SessionType[] = [
  {
    blurb: 'Capture vocals, instruments or field audio. Multitrack with monitoring and overdubs.',
    color: 'hsl(8, 85%, 55%)',
    icon: 'record',
    key: 'record',
    meta: ['Multitrack', 'Monitor', 'Overdub'],
    title: 'Recording Session',
  },
  {
    blurb: 'Beat maker, drum scheduler, loops and instrument tracks on the timeline.',
    color: 'hsl(25, 90%, 55%)',
    icon: 'produce',
    key: 'produce',
    meta: ['Beat maker', 'Loops', 'MIDI'],
    title: 'Music Production',
  },
  {
    blurb: 'Open the channel strip mixer. EQ, sends, busses and master export.',
    color: 'hsl(210, 90%, 50%)',
    icon: 'mix',
    key: 'mix',
    meta: ['Strips', 'Sends', 'Export'],
    title: 'Mixing Session',
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

export const SAVED_SESSIONS: SavedSession[] = [
  { bpm: 142, duration: '3:42', id: 1, key: 'F min', kind: 'production', title: 'Liquid Drum 808', updated: '2h ago' },
  {
    bpm: 96,
    duration: '2:51',
    id: 2,
    key: 'A min',
    kind: 'mixing',
    title: 'Tape Saturator demo',
    updated: 'yesterday',
  },
  { bpm: 88, duration: '1:08', id: 3, key: 'C maj', kind: 'recording', title: 'Vocal Take 04', updated: '3d ago' },
  { bpm: 110, duration: '5:20', id: 4, key: 'D# min', kind: 'production', title: 'Granular Pads', updated: '1w ago' },
  { bpm: 128, duration: '4:02', id: 5, key: 'G min', kind: 'mixing', title: 'Late Night Bounce', updated: '1w ago' },
  { bpm: 120, duration: '2:14', id: 6, key: 'C maj', kind: 'production', title: 'First Steps', updated: '2w ago' },
  { bpm: null, duration: '6:48', id: 7, key: null, kind: 'recording', title: 'Field Recording 02', updated: '3w ago' },
];

export type PresenceStatus = 'live' | 'online' | 'idle' | 'offline';

export interface OnlineUser {
  name: string;
  handle: string;
  status: PresenceStatus;
  activity: string;
  listeners: number;
}

export const ONLINE: OnlineUser[] = [
  { activity: 'Recording vocals', handle: '@maya.o', listeners: 12, name: 'Maya Okafor', status: 'live' },
  { activity: 'Mixing — Side B', handle: '@theo', listeners: 0, name: 'Theo Rivera', status: 'online' },
  { activity: 'Producing — 92 BPM', handle: '@anouk', listeners: 0, name: 'Anouk Lemaire', status: 'online' },
  { activity: 'Streaming a beat set', handle: '@idris', listeners: 47, name: 'Idris Khan', status: 'live' },
  { activity: 'Browsing samples', handle: '@rosa', listeners: 0, name: 'Rosa Petrov', status: 'idle' },
  { activity: 'Mastering single', handle: '@junpark', listeners: 0, name: 'Jun Park', status: 'online' },
  { activity: 'Live drum jam', handle: '@cleo.b', listeners: 8, name: 'Cleo Banner', status: 'live' },
  { activity: 'Playlist: late night', handle: '@samwest', listeners: 0, name: 'Sam West', status: 'online' },
];

export interface ActivityItem {
  who: string;
  did: string;
  what: string;
  when: string;
}

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
