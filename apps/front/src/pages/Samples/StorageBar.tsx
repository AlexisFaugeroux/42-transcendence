import type { JSX } from 'react';
import { theme } from '@ui/theme/theme';
import { FAMILY_COLOR, formatMB, type SampleFamily, SAMPLES, STORAGE_LIMIT_GB, STORAGE_LIMIT_MB } from './samples.data';
import styles from './StorageBar.module.scss';

const FAMILY_ORDER: SampleFamily[] = ['drums', 'bass', 'synth', 'vocal', 'perc', 'texture', 'fx'];

export function StorageBar(): JSX.Element {
  // Total MB per family, summed once.
  const byFamily = SAMPLES.reduce<Record<string, number>>((acc, s) => {
    acc[s.family] = (acc[s.family] ?? 0) + s.size;
    return acc;
  }, {});

  const usedMB = SAMPLES.reduce((acc, s) => acc + s.size, 0);
  const pct = Math.min(1, usedMB / STORAGE_LIMIT_MB);
  const remaining = Math.max(0, STORAGE_LIMIT_MB - usedMB);
  const warn = pct > 0.8;

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.label}>Storage</span>
          <span className={styles.mono}>
            <span style={{ color: warn ? theme.yellow : theme.orange }}>{formatMB(usedMB)}</span>
            <span className={styles.muted}> / {STORAGE_LIMIT_GB} GB</span>
          </span>
          <span className={styles.muted}>
            ({Math.round(pct * 100)}% — {formatMB(remaining)} free)
          </span>
        </div>
      </div>

      <div className={styles.bar}>
        {FAMILY_ORDER.map((family) => {
          const width = (byFamily[family] ?? 0) / STORAGE_LIMIT_MB;
          if (width === 0) return null;
          return (
            <div
              key={family}
              title={`${family} — ${formatMB(byFamily[family] ?? 0)}`}
              style={{ background: FAMILY_COLOR[family], width: `${width * 100}%` }}
            />
          );
        })}
      </div>

      <div className={styles.legend}>
        {FAMILY_ORDER.filter((f) => byFamily[f]).map((family) => (
          <span key={family} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: FAMILY_COLOR[family] }} />
            {family}
            <span className={styles.muted}>{formatMB(byFamily[family] ?? 0)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
