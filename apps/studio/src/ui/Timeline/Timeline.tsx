import type { Project } from '@opendaw/studio-core';
import type { JSX } from 'react';
import { computeBarsFromSDK } from '../../lib/audioUtils';
import type { Clip } from '../../lib/types';
import { PIXELS_PER_PULSE, ROW_HEIGTH } from './constants';
import { Grid } from './Grid/Grid';
import styles from './Timeline.module.scss';
import { useProject } from '../../contexts/ProjectContext';

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
  clips: Clip[];
  tracks: string[];
}

export function Timeline({ clips, tracks }: TimelineProps): JSX.Element {
  const { project } = useProject();

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
          <Grid height={500} pixelsPerPulse={0.1} tracks={tracks} clips={clips} />
        </div>
      </div>
    </>
  );
}
