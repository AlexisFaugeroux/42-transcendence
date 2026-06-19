import { type ppqn } from '@opendaw/lib-dsp';
import type { AudioFileBox, AudioRegionBox, TrackBox, ValueEventCollectionBox } from '@opendaw/studio-boxes';

export interface BarInfo {
  startPpqn: ppqn;
  durationPpqn: ppqn;
  nominator: number;
  denominator: number;
  barNumber: number;
}

export interface Clip {
  audioDuration: number;
  audioFileBox: AudioFileBox;
  trackName: string;
  trackBox: TrackBox;
  gap: number;
  position: number;
  duration: number;
  color: string;
  label: string;
  eventsCollectionBox: ValueEventCollectionBox;
  regionBox: AudioRegionBox;
}
