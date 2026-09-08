import { PPQN } from '@opendaw/lib-dsp';
import { useTranslation } from '@transcendence/i18n';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { useCurrentPosition } from '../../../hooks/useCurrentPosition';
import styles from './Metrics.module.scss';

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
      <div className={styles.unit}>
        <input
          type="number"
          className={`${styles.value} ${styles.bpmInput}`}
          value={bpm}
          aria-label={t('studio.metrics.bpm')}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 200) return;
            handleBpmChange(value);
          }}
        />
        <span className={styles.unitLabel}>{t('studio.metrics.bpm')}</span>
      </div>
      <div className={styles.unit}>
        <span className={styles.value}>
          {nominator}/{denominator}
        </span>
        <span className={styles.unitLabel}>sig</span>
      </div>
      <div className={`${styles.unit} ${styles.position}`}>
        <span className={styles.value}>
          {String(bar).padStart(2, '0')}.{String(beat).padStart(2, '0')}.000
        </span>
        <span className={styles.unitLabel}>bars</span>
      </div>
    </div>
  );
}
