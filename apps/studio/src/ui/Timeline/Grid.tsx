import type { Project } from '@opendaw/studio-core';
import type { JSX } from 'react';
import styles from './Grid.module.scss';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import type { Clip } from '../../lib/types';
import { ROW_HEIGTH } from './constants';

interface GridPros {
  project: Project;
  height: number;
  pixelsPerPulse: number; // zoom level, e.g 0.1 means 0.1px per PPQN tick
  tracks: string[];
  clips: Clip[];
  currentPosition: number;
  isPlaying: boolean;
}

export function Grid({
  clips,
  currentPosition,
  height,
  isPlaying,
  pixelsPerPulse,
  project,
  tracks,
}: GridPros): JSX.Element {
  const totalDuration = project.timelineBox.durationInPulses.getValue();
  const fullGridWidth = totalDuration * pixelsPerPulse;
  const svgWidth = totalDuration * pixelsPerPulse;
  const bars = computeBarsFromSDK(project);

  // lines
  const lines: JSX.Element[] = [];
  bars.forEach((bar) => {
    const beatDuration = bar.durationPpqn / bar.nominator;

    for (let beat = 0; beat < bar.nominator; beat++) {
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
        <rect key={`sep-${index}`} x={0} y={index * ROW_HEIGTH - 1} height={1} width={fullGridWidth} fill="#000" />,
      );
    }
    tracksSvg.push(
      <rect
        key={`track-${index}`}
        x={0}
        y={ROW_HEIGTH * index}
        height={ROW_HEIGTH}
        width={fullGridWidth}
        fill="#2a2a2a"
        opacity={0.7}
      />,
    );
  });

  function renderClip({ clip, index, tracks }: { clip: Clip; tracks: string[]; index: number }) {
    const trackIndex = tracks.indexOf(clip.trackName);
    const x = clip.position * pixelsPerPulse;
    const y = ROW_HEIGTH * trackIndex;
    const width = clip.duration * pixelsPerPulse;

    return (
      <rect
        key={`track-${trackIndex}-clip-${index}`}
        x={x}
        y={y}
        width={width}
        height={ROW_HEIGTH}
        fill={clip.color}
        opacity={0.7}
        stroke="black"
        strokeWidth={2}
      />
    );
  }

  function renderPlayhead({
    currentPosition,
    isPlaying,
  }: {
    currentPosition: number;
    isPlaying: boolean;
  }): JSX.Element | null {
    if (!isPlaying) return null;

    const x = currentPosition * pixelsPerPulse;

    return <line x1={x} y1={0} x2={x} y2={height} stroke="#FFF" strokeWidth={2} />;
  }

  return (
    <div className={styles.wrapper} style={{ width: fullGridWidth }}>
      <svg width={svgWidth} height={height} className={styles.svg}>
        {tracksSvg}

        {lines}

        {clips.map((clip, index) => renderClip({ clip, index, tracks }))}

        {isPlaying ? renderPlayhead({ currentPosition, isPlaying }) : null}
      </svg>
    </div>
  );
}
