import { PeaksPainter } from '@opendaw/lib-fusion';
import { AudioRegionBoxAdapter } from '@opendaw/studio-adapters';
import type { Project } from '@opendaw/studio-core';
import { type JSX, useEffect, useRef, useState } from 'react';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import type { Clip } from '../../lib/types';
import { ROW_HEIGTH } from './constants';
import styles from './Grid.module.scss';

interface ClipWaveformProps {
  clip: Clip;
  x: number;
  y: number;
  width: number;
  project: Project;
}

function ClipWaveform({ clip, project, width, x, y }: ClipWaveformProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Subscribe to sample loader
  useEffect(() => {
    let regionAdapter: AudioRegionBoxAdapter;
    try {
      regionAdapter = project.boxAdapters.adapterFor(clip.regionBox, AudioRegionBoxAdapter);
    } catch {
      return;
    }

    const loader = regionAdapter.file.getOrCreateLoader();
    if (loader.peaks.nonEmpty()) {
      setIsReady(true);
      return;
    }

    const subscription = loader.subscribe((state) => {
      if (state.type === 'loaded') {
        setIsReady(true);
      }
    });

    return () => {
      subscription.terminate();
    };
  }, [clip.regionBox, project.boxAdapters]);

  // Draw waveforms on the canvas
  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the adapter for this region to access peaks
    let regionAdapter: AudioRegionBoxAdapter;
    try {
      regionAdapter = project.boxAdapters.adapterFor(clip.regionBox, AudioRegionBoxAdapter);
    } catch {
      return; // Adapter not ready yet
    }

    const fileAdapter = regionAdapter.file;
    const peaksOpt = fileAdapter.peaks;
    if (peaksOpt.isEmpty()) return;

    const peaks = peaksOpt.unwrap();
    const numFrames = peaks.numFrames;
    const dpr = devicePixelRatio;

    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(ROW_HEIGTH * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clip header
    const headerHeight = 25;
    ctx.fillStyle = clip.color;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, canvas.width, headerHeight);
    ctx.globalAlpha = 1.0;

    // Draw clip name
    ctx.fillStyle = '#ffffff';
    ctx.font = `${9 * dpr}px Rubik, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText(clip.label, 4 * dpr, headerHeight / 2);

    // Draw clip background
    ctx.fillStyle = clip.color;
    ctx.globalAlpha = 0.15;
    ctx.fillRect(0, headerHeight, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw waveform using PeaksPainter
    ctx.fillStyle = clip.color;
    const numberOfChannels = peaks.numChannels;
    const peaksHeight = Math.floor((canvas.height - 4) / numberOfChannels);

    for (let channel = 0; channel < numberOfChannels; channel++) {
      PeaksPainter.renderPixelStrips(ctx, peaks, channel, {
        u0: 0,
        u1: numFrames,
        v0: -1,
        v1: 1,
        x0: 5, // slightly off not to be on top of the border
        x1: canvas.width,
        y0: headerHeight + 3 + channel * peaksHeight,
        y1: 3 + (channel + 1) * peaksHeight,
      });
    }

    // Draw clip border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }, [isReady, clip, width, project, x, y]);

  return <canvas ref={canvasRef} className={styles.clipCanvas} style={{ height: ROW_HEIGTH, left: x, top: y }} />;
}

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
        {isPlaying ? renderPlayhead({ currentPosition, isPlaying }) : null}
      </svg>
      {clips.map((clip, index) => {
        const trackIndex = tracks.indexOf(clip.trackName);
        if (trackIndex === -1) return null;

        const x = clip.position * pixelsPerPulse;
        const y = ROW_HEIGTH * trackIndex;
        const width = clip.duration * pixelsPerPulse;

        return <ClipWaveform key={`clip-waveform-${index}`} clip={clip} x={x} y={y} width={width} project={project} />;
      })}
    </div>
  );
}
