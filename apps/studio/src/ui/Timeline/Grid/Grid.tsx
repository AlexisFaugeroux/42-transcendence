import { type JSX, useEffect, useState } from 'react';
import { theme } from '@ui/theme/theme';
import { useProject } from '../../../contexts/ProjectContext';
import { useCurrentPosition } from '../../../hooks/useCurrentPosition';
import { computeBarsFromSDK } from '../../../lib/audioUtils';
import type { Clip } from '../../../lib/types';
import { ROW_HEIGTH } from '../constants';
import { ClipWaveform } from './ClipWaveform/ClipWaveform';
import styles from './Grid.module.scss';

interface GridPros {
  height: number;
  pixelsPerPulse: number; // zoom level, e.g 0.1 means 0.1px per PPQN tick
  tracks: string[];
  clips: Clip[];
}

export function Grid({ clips, height, pixelsPerPulse, tracks }: GridPros): JSX.Element {
  const { project } = useProject();
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    const sub = project.timelineBox.bpm.catchupAndSubscribe((obs) => {
      setBpm(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.bpm]);

  const currentPosition = useCurrentPosition(bpm);

  const totalDuration = project.timelineBox.durationInPulses.getValue();
  const fullGridWidth = totalDuration * pixelsPerPulse;
  const svgWidth = totalDuration * pixelsPerPulse;
  const bars = computeBarsFromSDK(project);

  useEffect(() => {
    const sub = project.engine.isPlaying.catchupAndSubscribe((obs) => {
      setIsPlaying(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.engine.isPlaying]);

  // lines
  const lines: JSX.Element[] = [];
  bars.forEach((bar, index) => {
    const beatDuration = bar.durationPpqn / bar.nominator;

    for (let beat = 0; beat < bar.nominator; beat++) {
      if (index === 0 && beat === 0) continue;

      const ppqnPosition = bar.startPpqn + beat * beatDuration;
      const x = ppqnPosition * pixelsPerPulse;

      const isMeasure = beat % bar.denominator === 0;

      lines.push(
        <rect
          key={`${bar.barNumber}-${beat}`}
          x={x}
          y={0}
          width={2}
          height={height}
          fill={isMeasure ? '#555' : '#333'}
        />,
      );
    }
  });

  const tracksSvg: JSX.Element[] = [];
  tracks.forEach((_, index) => {
    if (index !== 0) {
      tracksSvg.push(
        <rect
          key={`sep-${index}`}
          x={0}
          y={index * ROW_HEIGTH - 1}
          height={1}
          width={fullGridWidth}
          fill={theme.lineSoft}
        />,
      );
    }
    tracksSvg.push(
      <rect
        key={`track-${index}`}
        x={0}
        y={ROW_HEIGTH * index}
        height={ROW_HEIGTH}
        width={fullGridWidth}
        fill={theme.bgPanel}
      />,
    );
  });

  function renderPlayhead({
    currentPosition,
    isPlaying,
  }: {
    currentPosition: number;
    isPlaying: boolean;
  }): JSX.Element | null {
    if (!isPlaying) return null;

    const x = currentPosition * pixelsPerPulse;

    return <line x1={x} y1={0} x2={x} y2={height} stroke={theme.fg1} strokeWidth={2} />;
  }

  return (
    <div className={styles.wrapper} style={{ width: fullGridWidth }}>
      <svg width={svgWidth} height={height} className={styles.svg}>
        {tracksSvg}
        {lines}
        {isPlaying ? renderPlayhead({ currentPosition, isPlaying }) : null}
      </svg>
      {clips.map((clip, index) => {
        const trackIndex = tracks.indexOf(clip.trackName);
        if (trackIndex === -1) return null;

        const x = clip.position * pixelsPerPulse;
        const y = ROW_HEIGTH * trackIndex;
        const width = clip.duration * pixelsPerPulse;

        return <ClipWaveform key={`clip-waveform-${index}`} clip={clip} x={x} y={y} width={width} />;
      })}
    </div>
  );
}
