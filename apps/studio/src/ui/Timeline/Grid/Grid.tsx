import { UUID } from '@opendaw/lib-std';
import { type JSX, useEffect, useRef, useState } from 'react';
import { theme } from '@ui/theme/theme';
import type { Track } from '../../../App';
import { useProject } from '../../../contexts/ProjectContext';
import { useCurrentPosition } from '../../../hooks/useCurrentPosition';
import { computeBarsFromSDK } from '../../../lib/audioUtils';
import type { Clip as ClipData } from '../../../lib/types';
import { ROW_HEIGTH } from '../constants';
import { LoopRegionBandOver } from '../LoopRegion/LoopRegionBandOver';
import { Clip } from './Clip/Clip';
import styles from './Grid.module.scss';

interface GridPros {
  pixelsPerPulse: number; // zoom level, e.g 0.1 means 0.1px per PPQN tick
  tracks: Track[];
  clips: ClipData[];
}

export function Grid({ clips, pixelsPerPulse, tracks }: GridPros): JSX.Element {
  const { project } = useProject();
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [viewportHeight, setViewportHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const viewport = wrapperRef.current?.parentElement; // grid viewport
    if (!viewport) return;

    const update = () => {
      setViewportHeight(viewport.clientHeight);
    };
    update();

    const reszieObserver = new ResizeObserver(update);
    reszieObserver.observe(viewport);

    return () => {
      reszieObserver.disconnect();
    };
  }, []);

  const contentHeight = tracks.length * ROW_HEIGTH; // current height property
  const gridHeight = Math.max(contentHeight, viewportHeight);

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
          x={x - 1}
          y={0}
          width={2}
          height={gridHeight}
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

  if (tracks.length > 0) {
    tracksSvg.push(
      <rect key={`sep-last`} x={0} y={contentHeight - 1} height={1} width={fullGridWidth} fill={theme.lineSoft} />,
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

    return <line x1={x} y1={0} x2={x} y2={gridHeight} stroke={theme.fg1} strokeWidth={2} />;
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper} style={{ width: fullGridWidth }}>
      <svg width={svgWidth} height={gridHeight} className={styles.svg}>
        {tracksSvg}
        {lines}
        {isPlaying ? renderPlayhead({ currentPosition, isPlaying }) : null}
      </svg>
      {clips.map((clip) => {
        const trackIndex = tracks.findIndex((t) => t.trackBox === clip.trackBox);
        if (trackIndex === -1) return null;

        const x = clip.position * pixelsPerPulse;
        const y = ROW_HEIGTH * trackIndex;
        const width = clip.duration * pixelsPerPulse;

        return (
          <Clip key={UUID.toString(clip.regionBox.address.uuid)} bpm={bpm} clip={clip} x={x} y={y} width={width} />
        );
      })}
      <LoopRegionBandOver />
    </div>
  );
}
