import { PPQN } from '@opendaw/lib-dsp';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { useTracks } from '../../../contexts/TracksContext';
import styles from './Metrics.module.scss';

export function Metrics(): JSX.Element {
  const { project } = useProject();
  const { clips, setClips } = useTracks();
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    const sub = project.timelineBox.bpm.catchupAndSubscribe((field) => {
      setBpm(field.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.bpm]);

  function handleBpmChange(newBpm: number) {
    project.editing.modify(() => {
      project.timelineBox.bpm.setValue(newBpm);

      // Recalculate clip durations
      clips.forEach((clip) => {
        const newDuration = Math.min(Math.round(PPQN.secondsToPulses(clip.audioDuration, newBpm)), clip.gap);
        clip.regionBox.duration.setValue(newDuration);
        clip.regionBox.loopDuration.setValue(newDuration);
      });
    });

    const updatedClips = clips.map((clip) => ({
      ...clip,
      duration: Math.min(Math.round(PPQN.secondsToPulses(clip.audioDuration, newBpm)), clip.gap),
    }));

    setClips(updatedClips);
  }

  return (
    <div className={styles.metricsContainer}>
      <div className={styles.metric}>
        <span className={`${styles.metricValue} ${styles.primary}`}>12</span>
        <span className={styles.metricLabel}>bar</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricValue}>12</span>
        <span className={styles.metricLabel}>beat</span>
      </div>
      <div className={styles.metric}>
        <input
          type="number"
          className={styles.bpmInput}
          value={bpm}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 1 || value > 200) return;
            handleBpmChange(Number(e.target.value));
          }}
        />
        <span className={styles.metricLabel}>bpm</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricValue} style={{ fontSize: 13 }}>
          4/4
        </span>
        <span className={styles.metricLabel}>meter</span>
      </div>
    </div>
  );
}
