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
<<<<<<< HEAD
  gap: number;
=======
>>>>>>> e391d15 (chore: initial monorepo structure and tooling)
  position: number;
  duration: number;
  color: string;
  label: string;
  regionBox: AudioRegionBox;
}
