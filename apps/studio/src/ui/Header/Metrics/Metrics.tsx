import { useTranslation } from '@transcendence/i18n';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import styles from './Metrics.module.scss';
import { PPQN } from '@opendaw/lib-dsp';
import { useCurrentPosition } from '../../../hooks/useCurrentPosition';

export function Metrics(): JSX.Element {
  const { t } = useTranslation();
  const { project } = useProject();
  const [bpm, setBpm] = useState(() => project.timelineBox.bpm.getValue());
  const [nominator, setNominator] = useState(4);
  const [denominator, setDenominator] = useState(4);
  const position = useCurrentPosition(bpm);

  const { bars, beats } = PPQN.toParts(position, nominator, denominator);
  const bar = bars + 1; // 0 indexed by the SDK
  const beat = beats + 1; // 0 indexed by the SDK

  useEffect(() => {
    const sub = project.timelineBox.bpm.catchupAndSubscribe((field) => {
      setBpm(field.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.bpm]);

  useEffect(() => {
    const sub = project.timelineBox.signature.nominator.catchupAndSubscribe((obs) => {
      setNominator(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.signature.nominator]);

  useEffect(() => {
    const sub = project.timelineBox.signature.denominator.catchupAndSubscribe((obs) => {
      setDenominator(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.signature.denominator]);

  function handleBpmChange(newBpm: number) {
    project.editing.modify(() => {
      project.timelineBox.bpm.setValue(newBpm);
    });
  }

  return (
    <div className={styles.metricsContainer}>
      <div className={styles.metric}>
        <span className={`${styles.metricValue} ${styles.primary}`}>{bar}</span>
        <span className={styles.metricLabel}>{t('studio.metrics.bar')}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricValue}>{beat}</span>
        <span className={styles.metricLabel}>{t('studio.metrics.beat')}</span>
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
        <span className={styles.metricLabel}>{t('studio.metrics.bpm')}</span>
      </div>
      <div className={styles.metric}>
        <span className={styles.metricValue} style={{ fontSize: 13 }}>
          {nominator}/{denominator}
        </span>
        <span className={styles.metricLabel}>{t('studio.metrics.meter')}</span>
      </div>
    </div>
  );
}
