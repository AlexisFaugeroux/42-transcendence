import { type Project } from '@opendaw/studio-core';
import type { JSX } from 'react';
import type { Clip } from '../../lib/types';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import { PIXELS_PER_PULSE, ROW_HEIGTH } from './constants';
import { Grid } from './Grid';
import styles from './Timeline.module.scss';

function renderLabels(project: Project, pixelsPerPulse: number): JSX.Element[] {
  const bars = computeBarsFromSDK(project);
  return bars.map((bar) => {
    const x = bar.startPpqn * pixelsPerPulse;
    const width = bar.durationPpqn * pixelsPerPulse;

    return (
      <div
        key={`bar-label-${bar.barNumber}`}
        className={`${styles.barLabel} ${bar.barNumber % 2 ? styles.barLabelOdd : styles.barLabelEven}`}
        style={{ left: x, width }}
      >
        <span className={styles.barLabelText}>{bar.barNumber}</span>
      </div>
    );
  });
}

interface TimelineProps {
  project: Project;
  clips: Clip[];
  tracks: string[];
  currentPosition: number;
  isPlaying: boolean;
}

export function Timeline({ clips, currentPosition, isPlaying, project, tracks }: TimelineProps): JSX.Element {
  const totalDuration = project.timelineBox.durationInPulses.getValue();

  return (
    <>
      <div className={styles.container}>
        {/* Header row */}
        <div className={styles.header}>
          <div className={styles.headerCorner} />
          <div className={styles.barLabelsRow} style={{ width: totalDuration * PIXELS_PER_PULSE }}>
            {renderLabels(project, PIXELS_PER_PULSE)}
          </div>
        </div>

        {/* Racks & Grid */}
        <div className={styles.body}>
          <div className={styles.rackList}>
            {tracks.map((track, index) => (
              <div key={`rack-${index}`} className={styles.rackItem} style={{ height: ROW_HEIGTH }}>
                {track}
              </div>
            ))}
          </div>
          <Grid
            project={project}
            height={500}
            pixelsPerPulse={0.1}
            tracks={tracks}
            clips={clips}
            isPlaying={isPlaying}
            currentPosition={currentPosition}
          />
        </div>
      </div>
    </>
  );
}
