import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import styles from './Metrics.module.scss';

export function Metrics(): JSX.Element {
  const { project } = useProject();
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
    });
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
            if (value > 200) return;
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
