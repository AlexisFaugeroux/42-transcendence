import { AnimationFrame } from '@opendaw/lib-dom';
import { type JSX, useEffect, useRef } from 'react';
import { useMasterPeaks } from '../../../hooks/useMasterPeaks';
import { MsnPeakMeter } from '../../components/MsnPeakMeter/MsnPeakMeter';
import styles from './Meter.module.scss';

export function Meter(): JSX.Element {
  const peaksRef = useMasterPeaks();
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sub = AnimationFrame.add(() => {
      if (!labelRef.current) return;
      const db = peaksRef.current[2];
      labelRef.current.textContent = `MASTER ${db === -Infinity ? '-∞' : db.toFixed(1)} db`;
    });

    return () => {
      sub.terminate();
    };
  }, [peaksRef]);

  return (
    <div className={styles.peakMeter}>
      <div ref={labelRef} className={styles.peakMeterDisplayValue}></div>
      <MsnPeakMeter peaksRef={peaksRef} width={120} />
    </div>
  );
}
