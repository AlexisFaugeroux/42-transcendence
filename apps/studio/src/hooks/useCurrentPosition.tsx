import { AnimationFrame } from '@opendaw/lib-dom';
import { PPQN } from '@opendaw/lib-dsp';
import { useEffect, useState } from 'react';
import { useProject } from '../contexts/ProjectContext';

export function useCurrentPosition(bpm: number): number {
  const { audioContext, project } = useProject();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const sub = AnimationFrame.add(() => {
      const enginePos = project.engine.position.getValue();
      const latencySeconds = audioContext.baseLatency + audioContext.outputLatency;
      const latencyPulses = PPQN.secondsToPulses(latencySeconds, bpm);
      setPosition(Math.max(0, enginePos - latencyPulses));
    });

    return () => {
      sub.terminate();
    };
  }, [audioContext.baseLatency, audioContext.outputLatency, bpm, project.engine.position]);

  return position;
}
