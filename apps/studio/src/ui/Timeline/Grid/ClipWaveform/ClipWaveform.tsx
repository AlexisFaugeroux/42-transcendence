import { useEffect, useState, useRef, type JSX } from 'react';
import type { Clip } from '../../../../lib/types';
import { AudioRegionBoxAdapter } from '@opendaw/studio-adapters';
import { PeaksPainter } from '@opendaw/lib-fusion';
import { ROW_HEIGTH } from '../../constants';
import { useProject } from '../../../../contexts/ProjectContext';
import styles from './ClipWaveform.module.scss';

interface ClipWaveformProps {
  clip: Clip;
  x: number;
  y: number;
  width: number;
}

export function ClipWaveform({ clip, width, x, y }: ClipWaveformProps): JSX.Element {
  const { project } = useProject();
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
