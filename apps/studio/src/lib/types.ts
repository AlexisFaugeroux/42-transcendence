import { type ppqn } from '@opendaw/lib-dsp';
import type {
  AudioFileBox,
  AudioRegionBox,
  AudioUnitBox,
  TrackBox,
  ValueEventCollectionBox,
} from '@opendaw/studio-boxes';

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

export interface Sample {
  name: string;
  bpm?: number;
  samplekey?: string;
  url: string;
  id: string;
}

export interface ProjectProperties {
  id : string | null,
  name : string | null,
  bpm : number | null,
  duration : number,
  visibility : string,
  samples : string[] | null,
  state : string,
  key? : string,
  mode? : string
}