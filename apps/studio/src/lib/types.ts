import { type ppqn } from '@opendaw/lib-dsp';
import type {
  AudioFileBox,
  AudioRegionBox,
  AudioUnitBox,
  TrackBox,
  ValueEventCollectionBox,
} from '@opendaw/studio-boxes';
import type { Key, Mode } from '@transcendence/i18n';

export interface BarInfo {
  startPpqn: ppqn;
  durationPpqn: ppqn;
  nominator: number;
  denominator: number;
  barNumber: number;
}

export interface Track {
  audioUnitBox: AudioUnitBox;
  name: string;
  instrumentName: 'Nano' | 'Vaporisateur' | 'Tape';
  uuid: Readonly<Uint8Array>;
  trackBox: TrackBox;
  color: string;
}

export interface Clip {
  audioDuration: number;
  audioFileBox: AudioFileBox;
  trackName: string;
  trackBox: TrackBox;
  gap?: number;
  position: number;
  duration: number;
  color: string;
  label: string;
  eventsCollectionBox: ValueEventCollectionBox;
  regionBox: AudioRegionBox;
}

export type Family =
  | 'KICK'
  | 'SNARE'
  | 'CLAP'
  | 'HAT'
  | 'TOM'
  | 'PERC'
  | 'CYMBAL'
  | 'BASS'
  | 'SYNTH'
  | 'LEAD'
  | 'PAD'
  | 'KEYS'
  | 'PLUCK'
  | 'STRINGS'
  | 'BRASS'
  | 'VOCAL'
  | 'FX'
  | 'AMBIENCE';

export type Visibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface Sample {
  bytes: number;
  createdAt: string;
  duration: number;
  family: Family;
  name: string;
  bpm?: number;
  key?: Key | null;
  url: string;
  id: string;
  mode?: Mode | null;
  ownerId: string;
  ownerType: 'USER' | 'PLATEFORM';
  peaksUrl: string;
  visibility: Visibility;
}

export interface ProjectProperties {
  id: string | null;
  name: string | null;
  bpm?: number;
  duration: number;
  visibility: string;
  samples: string[] | null;
  state: string;
}
