import { gainToDb } from '@opendaw/lib-dsp';
import { EngineAddresses } from '@opendaw/studio-adapters';
import { type RefObject, useEffect, useRef } from 'react';
import { useProject } from '../contexts/ProjectContext';

// Buffer will be [linearL, linearR, dbMax]
export type PeaksRef = RefObject<Float32Array>;

export function useMasterPeaks(): PeaksRef {
  const { project } = useProject();
  const peaksRef = useRef(new Float32Array(3));

  useEffect(() => {
    const buffer = peaksRef.current;
    const sub = project.liveStreamReceiver.subscribeFloats(
      EngineAddresses.PEAKS,
      (data: Float32Array) => {
        buffer[0] = data[0];
        buffer[1] = data[1];
        buffer[2] = gainToDb(Math.max(data[0], data[1]));
      },
    );

    return () => {
      sub.terminate();
    };
  }, [project.liveStreamReceiver]);

  return peaksRef;
}
