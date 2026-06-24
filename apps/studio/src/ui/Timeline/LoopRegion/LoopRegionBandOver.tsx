import { type JSX, useEffect, useState } from 'react';
import { theme } from '@ui/theme/theme';
import { useProject } from '../../../contexts/ProjectContext';
import { useTracks } from '../../../contexts/TracksContext';
import { PIXELS_PER_PULSE, ROW_HEIGTH } from '../constants';
import styles from './LoopRegionBandOver.module.scss';

export function LoopRegionBandOver(): JSX.Element {
  const { project } = useProject();
  const { tracks } = useTracks();
  const [from, setFrom] = useState(() => project.timelineBox.loopArea.from.getValue());
  const [to, setTo] = useState(() => project.timelineBox.loopArea.to.getValue());
  const [isLooping, setIsLooping] = useState(() => project.timelineBox.loopArea.enabled.getValue());

  useEffect(() => {
    const subFrom = project.timelineBox.loopArea.from.catchupAndSubscribe((obs) => {
      setFrom(obs.getValue());
    });
    const subTo = project.timelineBox.loopArea.to.catchupAndSubscribe((obs) => {
      setTo(obs.getValue());
    });

    return () => {
      subFrom.terminate();
      subTo.terminate();
    };
  }, [project.timelineBox.loopArea.from, project.timelineBox.loopArea.to]);

  useEffect(() => {
    const sub = project.timelineBox.loopArea.enabled.catchupAndSubscribe((obs) => {
      setIsLooping(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.loopArea.enabled]);

  const left = from * PIXELS_PER_PULSE;
  const width = (to - from) * PIXELS_PER_PULSE;
  const height = tracks.length * ROW_HEIGTH;

  return (
    <div
      className={styles.loopBand}
      style={{
        background: isLooping ? `color-mix(in srgb, ${theme.purple} 7%, transparent)` : 'none',
        borderLeft: `2px solid color-mix(in srgb, ${isLooping ? theme.purple : theme.fg2} 50%, transparent)`,
        borderRight: `2px solid color-mix(in srgb, ${isLooping ? theme.purple : theme.fg2} 50%, transparent)`,
        height,
        left,
        width,
      }}
    />
  );
}
