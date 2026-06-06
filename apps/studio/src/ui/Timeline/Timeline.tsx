import type { Project } from '@opendaw/studio-core';
import { useRef, type JSX, type UIEvent } from 'react';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import { PIXELS_PER_PULSE, ROW_HEIGTH } from './constants';
import { Grid } from './Grid/Grid';
import styles from './Timeline.module.scss';
import { useProject } from '../../contexts/ProjectContext';
import { useTracks } from '../../contexts/TracksContext';
import { AddTrackButton, type TrackKind } from '../../ui/AddTrackButton';
import { InstrumentFactories } from '@opendaw/studio-adapters';

function renderLabels(project: Project, pixelsPerPulse: number): JSX.Element[] {
  const bars = computeBarsFromSDK(project);
  return bars.map((bar) => {
    const x = bar.startPpqn * pixelsPerPulse;
    const width = bar.durationPpqn * pixelsPerPulse;

    return (
      <div key={`bar-label-${bar.barNumber}`} className={styles.barLabel} style={{ left: x, width }}>
        <span className={styles.barLabelText}>{bar.barNumber}</span>
      </div>
    );
  });
}

export function Timeline(): JSX.Element {
  const { project } = useProject();
  const { clips, tracks, setTracks } = useTracks();
  const rackListRef = useRef<HTMLDivElement>(null);
  const barLabelsRef = useRef<HTMLDivElement>(null);

  const totalDuration = project.timelineBox.durationInPulses.getValue();
  const timelineWidth = totalDuration * PIXELS_PER_PULSE;

  const handleGridScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (rackListRef.current) rackListRef.current.scrollTop = scrollTop;
    if (barLabelsRef.current) barLabelsRef.current.scrollLeft = scrollLeft;
  };

  function handleAddTrack(kind: TrackKind) {
    project.editing.modify(() => {
      switch (kind) {
        case 'tape':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(InstrumentFactories.Tape);
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
        case 'nano':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(InstrumentFactories.Nano);
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
        case 'vaporisateur':
          {
            const { audioUnitBox, instrumentBox, trackBox } = project.api.createInstrument(
              InstrumentFactories.Vaporisateur,
            );
            audioUnitBox.volume.setValue(0);
            instrumentBox.label.setValue(`${kind} ${tracks.length + 1}`);

            setTracks((prev) => [
              ...prev,
              { color: '#888', name: `${kind} ${prev.length + 1}`, uuid: trackBox.target.address.uuid },
            ]);
          }
          break;
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* Top row: corner + bar labels*/}
      <div className={styles.topRow}>
        <div className={styles.corner}>
          <AddTrackButton onAddTrack={handleAddTrack} />
        </div>
        <div ref={barLabelsRef} className={styles.barLabelsViewport}>
          <div className={styles.barLabelsRow} style={{ width: timelineWidth }}>
            {renderLabels(project, PIXELS_PER_PULSE)}
          </div>
        </div>
      </div>

      {/* Bottom row: rack list + grid*/}
      <div className={styles.bottomRow}>
        <div ref={rackListRef} className={styles.rackViewport}>
          {tracks.map((track, index) => (
            <div key={`rack-${index}`} className={styles.rackItem} style={{ height: ROW_HEIGTH }}>
              {track.name}
            </div>
          ))}
        </div>
        <div className={styles.gridViewport} onScroll={handleGridScroll}>
          <Grid
            height={tracks.length * ROW_HEIGTH}
            pixelsPerPulse={PIXELS_PER_PULSE}
            tracks={tracks.map(({ name }) => name)}
            clips={clips}
          />
        </div>
      </div>
    </div>
  );
}
