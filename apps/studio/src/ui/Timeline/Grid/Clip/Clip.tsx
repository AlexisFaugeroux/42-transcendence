import { PPQN } from '@opendaw/lib-dsp';
import { Peaks, PeaksPainter } from '@opendaw/lib-fusion';
import { type Option, UUID } from '@opendaw/lib-std';
import { AudioRegionBoxAdapter } from '@opendaw/studio-adapters';
import { AudioRegionBox, ValueEventCollectionBox } from '@opendaw/studio-boxes';
import { CanvasPainter } from '@opendaw/studio-core';
import { type JSX, memo, type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { type MenuProps } from '@ui/index';
import { Dropdown } from '@ui/index';
import { theme } from '@ui/theme/theme';
import { useProject } from '../../../../contexts/ProjectContext';
import { useTracks } from '../../../../contexts/TracksContext';
import { resolveCssColor } from '../../../../lib/resolveCssColor';
import type { Clip as ClipType } from '../../../../lib/types';
import { StudioIcon } from '../../../components/StudioIcon/StudioIcon';
import { PIXELS_PER_PULSE, RESIZE_HANDLE_PX, ROW_HEIGTH } from '../../constants';
import styles from './Clip.module.scss';

function renderClipHeader(ctx: CanvasRenderingContext2D, color: string, width: number, headerHeight: number) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, width, headerHeight);
  ctx.globalAlpha = 1.0;
}

function renderClipName(ctx: CanvasRenderingContext2D, label: string, color: string, headerHeight: number) {
  ctx.fillStyle = color;
  ctx.font = '9px Rubik, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 4, headerHeight / 2);
}

function renderClipBackground(
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number,
  height: number,
  headerHeight: number,
) {
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, headerHeight, width, height - headerHeight);
  ctx.globalAlpha = 1.0;
}

function renderWaveform(
  ctx: CanvasRenderingContext2D,
  peaksOpt: Option<Peaks>,
  audioDuration: number,
  height: number,
  headerHeight: number,
) {
  const peaks = peaksOpt.unwrap();
  const numFrames = peaks.numFrames;
  const numberOfChannels = peaks.numChannels;
  const peaksHeight = Math.floor((height - 4) / numberOfChannels);

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bright').trim();

  for (let channel = 0; channel < numberOfChannels; channel++) {
    PeaksPainter.renderPixelStrips(ctx, peaks, channel, {
      u0: 0,
      u1: numFrames,
      v0: -1,
      v1: 1,
      x0: 5, // slightly off not to be on top of the border
      x1: audioDuration,
      y0: headerHeight + 3 + channel * peaksHeight,
      y1: 3 + (channel + 1) * peaksHeight,
    });
  }
}

function renderClipBorder(ctx: CanvasRenderingContext2D, color: string, width: number, height: number) {
  ctx.strokeStyle = color;
  const lineWidth = 1;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = 0.5;
  ctx.strokeRect(lineWidth / 2, lineWidth / 2, width - lineWidth, height - lineWidth);
}

interface ClipProps {
  bpm: number;
  clip: ClipType;
  x: number;
  y: number;
  width: number;
}

export const Clip = memo(function Clip({ bpm, clip, width, x, y }: ClipProps): JSX.Element {
  const { project } = useProject();
  const { clips, setClips, tracks } = useTracks();
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [resizeDeltaPx, setResizeDeltaPx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const relatedTrack = tracks.find((t) => t.trackBox === clip.trackBox);
  const SNAP = PPQN.Quarter / 4;

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

      const dpr = devicePixelRatio;
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;

      context.save();
      context.setTransform(dpr, 0, 0, dpr, 0, 0); // 1 unit = 1px CSS on every support

      const headerHeight = 14;

      renderClipHeader(context, resolveCssColor(clip.color), cssW, headerHeight);
      renderClipName(
        context,
        clip.label,
        getComputedStyle(document.documentElement).getPropertyValue('--fg1'),
        headerHeight,
      );
      renderClipBackground(context, resolveCssColor(clip.color), cssW, cssH, headerHeight);
      renderWaveform(
        context,
        peaksOptions,
        PPQN.secondsToPulses(clip.audioDuration, bpm) * PIXELS_PER_PULSE,
        cssH,
        headerHeight,
      );
      renderClipBorder(context, resolveCssColor(clip.color), cssW, cssH);

      context.restore();
    });

    return () => {
      painter.terminate();
    };
  }, [bpm, isReady, clip, project]);

  function startMove(e: ReactMouseEvent<HTMLCanvasElement>) {
    const startMouseX = e.clientX;
    const startPosition = clip.position;

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

      if (!relatedTrack) return;

      const deltaPx = ev.clientX - startMouseX;
      const deltaPpqn = deltaPx / PIXELS_PER_PULSE;
      const rawPpqn = Math.max(0, startPosition + deltaPpqn);
      const newPosition = Math.round(rawPpqn / SNAP) * SNAP;

      setDragOffsetPx(0);

      const newEnd = newPosition + clip.duration;
      if (
        newPosition === startPosition ||
        clips.some(
          (c) =>
            c.trackBox === relatedTrack.trackBox &&
            c.regionBox !== clip.regionBox &&
            c.position + c.duration > newPosition &&
            c.position < newEnd,
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
        }
      });

      setClips((prev) => prev.map((c) => (c.regionBox === clip.regionBox ? { ...c, position: newPosition } : c)));
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startResize(e: ReactMouseEvent<HTMLCanvasElement>) {
    const startMouseX = e.clientX;
    const startDuration = clip.duration;
    const MIN_DURATION = SNAP; // no zero or negative width;

    function onMove(ev: MouseEvent) {
      const deltaPx = ev.clientX - startMouseX;
      const deltaPpqn = deltaPx / PIXELS_PER_PULSE;
      const rawDuration = Math.max(MIN_DURATION, startDuration + deltaPpqn);
      const snapped = Math.round(rawDuration / SNAP) * SNAP;
      setResizeDeltaPx((snapped - startDuration) * PIXELS_PER_PULSE);
    }

    function onUp(ev: MouseEvent) {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      if (!relatedTrack) return;
      const deltaPx = ev.clientX - startMouseX;
      const rawDuration = Math.max(MIN_DURATION, startDuration + deltaPx / PIXELS_PER_PULSE);
      const newDuration = Math.round(rawDuration / SNAP) * SNAP;
      const newEnd = clip.position + newDuration;

      if (
        clips.some(
          (c) =>
            c.trackBox === relatedTrack.trackBox &&
            c.regionBox !== clip.regionBox &&
            c.position + c.duration > clip.position &&
            c.position < newEnd,
        )
      ) {
        setResizeDeltaPx(0);
        return;
      }

      setResizeDeltaPx(0);
      if (newDuration === startDuration) return;

      project.editing.modify(() => {
        clip.regionBox.duration.setValue(newDuration);
        clip.regionBox.loopDuration.setValue(newDuration);

        const clipEnd = clip.position + newDuration;
        const loopTo = project.timelineBox.loopArea.to.getValue();
        if (clipEnd > loopTo) {
          const bar = PPQN.Quarter * 4;
          const newEnd = Math.ceil(clipEnd / bar) * bar;
          project.timelineBox.durationInPulses.setValue(newEnd);
        }
      });

      setClips((prev) => prev.map((c) => (c.regionBox === clip.regionBox ? { ...c, duration: newDuration } : c)));
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleMouseDown(e: ReactMouseEvent<HTMLCanvasElement>) {
    if (e.button !== 0) return; // left button only
    e.preventDefault();

    const offsetX = e.nativeEvent.offsetX;
    if (offsetX >= width - RESIZE_HANDLE_PX) {
      startResize(e);
    } else {
      startMove(e);
    }
  }

  function handleDuplicate() {
    if (!relatedTrack) return;

    const newClipPosition = clip.position + clip.duration;
    const newClipEndPosition = newClipPosition + clip.duration;

    if (
      clips.some(
        (c) =>
          c.regionBox !== clip.regionBox &&
          c.trackName === relatedTrack.name &&
          c.position + c.duration > newClipPosition &&
          c.position < newClipEndPosition,
      )
    )
      return;

    const duplicate = project.editing.modify(() => {
      const eventsCollectionBox = ValueEventCollectionBox.create(project.boxGraph, UUID.generate());
      const regionBox = AudioRegionBox.create(project.boxGraph, UUID.generate(), (box) => {
        box.regions.refer(relatedTrack.trackBox.regions);
        box.file.refer(clip.audioFileBox);
        box.events.refer(eventsCollectionBox.owners);
        box.position.setValue(newClipPosition);
        box.duration.setValue(clip.duration);
        box.loopOffset.setValue(0);
        box.loopDuration.setValue(clip.duration);
        box.label.setValue(clip.audioFileBox.name);
        box.mute.setValue(false);
      });

      const loopTo = project.timelineBox.loopArea.to.getValue();
      if (newClipEndPosition > loopTo) {
        const bar = PPQN.Quarter * 4;
        const newEnd = Math.ceil(newClipEndPosition / bar) * bar;
        project.timelineBox.durationInPulses.setValue(newEnd);
        project.timelineBox.loopArea.to.setValue(newEnd);
      }

      return { eventsCollectionBox, regionBox };
    });

    if (duplicate.isEmpty()) return;
    const { eventsCollectionBox, regionBox } = duplicate.unwrap();

    setClips((prev) => [...prev, { ...clip, eventsCollectionBox, position: newClipPosition, regionBox }]);
  }

  function handleDelete() {
    // WARN: Do not delete clip.trackBox, clip.eventsCollectionBox or clip.audioFiles
    // as they reference shared objects used by other clips, tracks etc...
    project.editing.modify(() => {
      clip.regionBox.delete();
      clip.eventsCollectionBox.delete();
    });

    setClips((prev) => prev.filter((c) => c.regionBox !== clip.regionBox));
  }

  function handleHoverCursor(e: ReactMouseEvent<HTMLCanvasElement>) {
    const offsetX = e.nativeEvent.offsetX; // x within the canvas;
    const nearRightEdge = offsetX >= width - RESIZE_HANDLE_PX;
    e.currentTarget.style.cursor = nearRightEdge ? 'ew-resize' : 'grab';
  }

  const menuItems: MenuProps['items'] = [
    {
      icon: (
        <StudioIcon
          name="clip"
          size={10}
          style={{
            marginRight: '4px',
          }}
        />
      ),
      key: 'duplicate',
      label: 'Duplicate',
      style: {
        fontSize: '10px',
      },
    },
    {
      icon: (
        <StudioIcon
          name="delete"
          color={theme.red}
          size={10}
          style={{
            marginRight: '4px',
          }}
        />
      ),
      key: 'delete',
      label: 'Delete',
      style: {
        fontSize: '10px',
      },
    },
  ];

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'delete') handleDelete();
    else if (key === 'duplicate') handleDuplicate();
  };

  return (
    <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} trigger={['contextMenu']}>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleHoverCursor}
        ref={canvasRef}
        className={styles.clipCanvas}
        style={{ height: ROW_HEIGTH, left: x + dragOffsetPx, top: y, width: width + resizeDeltaPx }}
      />
    </Dropdown>
  );
});
