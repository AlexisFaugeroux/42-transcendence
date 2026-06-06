import { type ppqn } from '@opendaw/lib-dsp';
import type { AudioRegionBox } from '@opendaw/studio-boxes';

export interface BarInfo {
  startPpqn: ppqn;
  durationPpqn: ppqn;
  nominator: number;
  denominator: number;
  barNumber: number;
}

export interface Clip {
  audioDuration: number;
  trackIndex: number;
  trackName: string;
  gap: number;
  position: number;
  duration: number;
  color: string;
  label: string;
  regionBox: AudioRegionBox;
}
