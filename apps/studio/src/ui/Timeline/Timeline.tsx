import { Project } from '@opendaw/studio-core';
import {
  type JSX,
  type MouseEvent,
  type UIEvent,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { useTracks } from '../../contexts/TracksContext';
import { createTrack, type InstrumentType } from '../../lib/arrangementFactory';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import { AddTrackButton } from '../../ui/AddTrackButton';
import { PIXELS_PER_PULSE } from './constants';
import { Grid } from './Grid/Grid';
import { LoopRegionHandleStrip } from './LoopRegion/LoopRegionHandleStrip';
import { Rack } from './Rack/Rack';
import styles from './Timeline.module.scss';

function renderLabels(project: Project, pixelsPerPulse: number): JSX.Element[] {
  const bars = computeBarsFromSDK(project);
  return bars.map((bar) => {
    const x = bar.startPpqn * pixelsPerPulse;
    const width = bar.durationPpqn * pixelsPerPulse;

    return (
      <div
        key={`bar-label-${bar.barNumber}`}
        className={styles.barLabel}
        style={{ left: x, width }}
      >
        <span className={styles.barLabelText}>{bar.barNumber}</span>
      </div>
    );
  });
}

export function Timeline(): JSX.Element {
  const { audioContext, project } = useProject();
  const { clips, setTracks, tracks } = useTracks();
  const [totalDuration, setTotalDuration] = useState(() =>
    project.timelineBox.durationInPulses.getValue(),
  );
  const rackListRef = useRef<HTMLDivElement>(null);
  const barLabelsRef = useRef<HTMLDivElement>(null);
  const gridViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sub = project.timelineBox.durationInPulses.catchupAndSubscribe((obs) => {
      setTotalDuration(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.durationInPulses]);

  const timelineWidth = totalDuration * PIXELS_PER_PULSE;

  const handleGridScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollTop } = e.currentTarget;
    if (rackListRef.current) rackListRef.current.scrollTop = scrollTop;
    if (barLabelsRef.current) barLabelsRef.current.scrollLeft = scrollLeft;
  };

  const handleRackListScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (gridViewportRef.current) gridViewportRef.current.scrollTop += e.deltaY;
  };

  function handleAddTrack(instrument: InstrumentType) {
    project.editing.modify(() => {
      const newTrack = createTrack(project.api, instrument, `${instrument}-${tracks.length + 1}`);

      setTracks((prev) => [...prev, newTrack]);
    });
  }

  function handleDoubleClick(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const pulses = xPx / PIXELS_PER_PULSE;

    const bars = computeBarsFromSDK(project);
    const bar = bars.find((b) => pulses >= b.startPpqn && pulses < b.startPpqn + b.durationPpqn);

    project.editing.modify(() => {
      project.engine.setPosition(bar?.startPpqn ?? 0);
    });

    if (audioContext.state === 'suspended') {
      void audioContext.resume();
    }

    project.engine.play();
  }

  return (
    <div className={styles.container}>
      {/* Top row: corner + bar labels*/}
      <div className={styles.topRow}>
        <div className={styles.corner}>
          <AddTrackButton onAddTrack={handleAddTrack} />
        </div>
        <div ref={barLabelsRef} className={styles.barLabelsViewport}>
          <div
            className={styles.barLabelsRow}
            style={{ width: timelineWidth }}
            onDoubleClick={handleDoubleClick}
          >
            {renderLabels(project, PIXELS_PER_PULSE)}
          </div>
          <LoopRegionHandleStrip timelineWidth={timelineWidth} />
        </div>
      </div>

      {/* Bottom row: rack list + grid*/}
      <div className={styles.bottomRow}>
        <div ref={rackListRef} className={styles.rackViewport} onWheel={handleRackListScroll}>
          {tracks.map((track, index) => (
            <Rack key={`rack-${index}`} track={track} />
          ))}
        </div>
        <div ref={gridViewportRef} className={styles.gridViewport} onScroll={handleGridScroll}>
          <Grid tracks={tracks} clips={clips} />
        </div>
      </div>
    </div>
  );
}
