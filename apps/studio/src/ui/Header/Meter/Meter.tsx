import { MsnPeakMeter } from '../../components/MsnPeakMeter/MsnPeakMeter';
import { useEffect, useRef, type JSX } from 'react';
import styles from './Meter.module.scss';
import { useMasterPeaks } from '../../../hooks/useMasterPeaks';
import { AnimationFrame } from '@opendaw/lib-dom';

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
