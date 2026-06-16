import { Peaks, PeaksPainter } from '@opendaw/lib-fusion';
import type { Option } from '@opendaw/lib-std';
import { AudioRegionBoxAdapter } from '@opendaw/studio-adapters';
import { CanvasPainter } from '@opendaw/studio-core';
import React, { type JSX, useEffect, useRef, useState } from 'react';
import { useProject } from '../../../../contexts/ProjectContext';
import type { Clip } from '../../../../lib/types';
import { PIXELS_PER_PULSE, ROW_HEIGTH } from '../../constants';
import styles from './Clip.module.scss';
import { useTracks } from '../../../../contexts/TracksContext';
import { PPQN } from '@opendaw/lib-dsp';

function renderClipHeader(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: string, height: number) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, canvas.width, height);
  ctx.globalAlpha = 1.0;
}

function renderClipName(ctx: CanvasRenderingContext2D, label: string, color: string, height: number) {
  ctx.fillStyle = color;
  ctx.font = `${9 * devicePixelRatio}px Rubik, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 4 * devicePixelRatio, height / 2);
}

function renderClipBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: string, height: number) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.15;
  ctx.fillRect(0, height, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;
}

function renderWaveform(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  peaksOpt: Option<Peaks>,
  headerHeight: number,
) {
  const peaks = peaksOpt.unwrap();
  const numFrames = peaks.numFrames;
  const numberOfChannels = peaks.numChannels;
  const peaksHeight = Math.floor((canvas.height - 4) / numberOfChannels);

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bright').trim();

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
}

function renderClipBorder(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

interface ClipProps {
  clip: Clip;
  x: number;
  y: number;
  width: number;
}

export function Clip({ clip, width, x, y }: ClipProps): JSX.Element {
  const { project } = useProject();
  const { clips, setClips, tracks } = useTracks();
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
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

    const painter = new CanvasPainter(canvas, ({ context }) => {
      const peaksOptions = regionAdapter.file.peaks;
      if (peaksOptions.isEmpty()) return;

      const headerHeight = 25;
      renderClipHeader(canvas, context, clip.color, headerHeight);
      renderClipName(
        context,
        clip.label,
        getComputedStyle(document.documentElement).getPropertyValue('--fg1'),
        headerHeight,
      );
      renderClipBackground(canvas, context, clip.color, headerHeight);
      renderWaveform(canvas, context, peaksOptions, headerHeight);
      renderClipBorder(canvas, context, clip.color);
    });

    return () => {
      painter.terminate();
    };
  }, [isReady, clip, width, project, x, y]);

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const startMouseX = e.clientX;
    const startPosition = clip.position;
    const SNAP = PPQN.Quarter / 4;

    function onMove(ev: MouseEvent) {
      const deltaPx = ev.clientX - startMouseX;
      const deltaPpqn = deltaPx / PIXELS_PER_PULSE;
      const rawPpqn = Math.max(0, startPosition + deltaPpqn);
      const snappedPpqn = Math.round(rawPpqn / SNAP) * SNAP;
      // Convert the *snapped* PPQN back to pixels for the visual preview
      setDragOffsetPx((snappedPpqn - startPosition) * PIXELS_PER_PULSE);
    }

    function onUp(ev: MouseEvent) {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      const deltaPx = ev.clientX - startMouseX;
      const deltaPpqn = deltaPx / PIXELS_PER_PULSE;
      const rawPpqn = Math.max(0, startPosition + deltaPpqn);
      const newPosition = Math.round(rawPpqn / SNAP) * SNAP;

      setDragOffsetPx(0);

      const currentTrack = tracks.find((t) => t.name === clip.trackName);
      if (
        newPosition === startPosition ||
        clips.some(
          (c) =>
            c.regionBox !== clip.regionBox &&
            c.trackName === currentTrack?.name &&
            c.position <= newPosition &&
            c.position + c.duration >= newPosition,
        )
      )
        return;

      project.editing.modify(() => {
        clip.regionBox.position.setValue(newPosition);

        const clipEnd = newPosition + clip.duration;
        const loopTo = project.timelineBox.loopArea.to.getValue();
        if (clipEnd > loopTo) {
          const bar = PPQN.Quarter * 4;
          const newEnd = Math.ceil(clipEnd / bar) * bar;
          project.timelineBox.durationInPulses.setValue(newEnd);
          project.timelineBox.loopArea.to.setValue(newEnd);
        }
      });

      setClips((prev) => prev.map((c) => (c.regionBox === clip.regionBox ? { ...c, position: newPosition } : c)));
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleDelete() {
    project.editing.modify(() => {
      clip.regionBox.delete();
    });

    setClips((prev) => prev.filter((c) => c.regionBox !== clip.regionBox));
  }

  return (
    <canvas
      onMouseDown={handleMouseDown}
      ref={canvasRef}
      className={styles.clipCanvas}
      style={{ height: ROW_HEIGTH, left: x + dragOffsetPx, top: y, width }}
    />
  );
}
