import { theme } from '@transcendence/ui';
import type { JSX } from 'react';
import type { AudioStorageUsage } from '../../api/audioFile/types';
import { FAMILY_COLOR, FAMILY_GROUPS, type FamilyGroup, familyGroup, formatBytes } from './samples.data';
import styles from './StorageBar.module.scss';

interface StorageBarProps {
  usage: AudioStorageUsage;
}

const EMPTY_GROUPS: Record<FamilyGroup, number> = {
  AMBIENCE: 0,
  BASS: 0,
  DRUMS: 0,
  FX: 0,
  KICKS: 0,
  OTHER: 0,
  SYNTH: 0,
  VOCAL: 0,
};

export function StorageBar({ usage }: StorageBarProps): JSX.Element {
  const { byFamily, quotaBytes, usedBytes } = usage;

  const byGroup = byFamily.reduce<Record<FamilyGroup, number>>(
    (acc, { bytes, family }) => {
      acc[familyGroup(family)] += bytes;
      return acc;
    },
    { ...EMPTY_GROUPS },
  );

  const pct = Math.min(1, usedBytes / quotaBytes);
  const remaining = Math.max(0, quotaBytes - usedBytes);
  const warn = pct > 0.8;

  const groups = Object.keys(FAMILY_GROUPS) as FamilyGroup[];

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.label}>Storage</span>
          <span className={styles.mono}>
            <span style={{ color: warn ? theme.yellow : theme.orange }}>{formatBytes(usedBytes)}</span>
            <span className={styles.muted}> / {formatBytes(quotaBytes)}</span>
          </span>
          <span className={styles.muted}>
            ({Math.round(pct * 100)}% — {formatBytes(remaining)} free)
          </span>
        </div>
      </div>

      <div className={styles.bar}>
        {groups.map((group) => {
          const width = byGroup[group] / quotaBytes;
          if (width === 0) return null;
          return (
            <div
              key={group}
              title={`${group} — ${formatBytes(byGroup[group])}`}
              style={{ background: FAMILY_COLOR[group], width: `${(width * 100).toString()}%` }}
            />
          );
        })}
      </div>

      <div className={styles.legend}>
        {groups
          .filter((group) => byGroup[group])
          .map((group) => (
            <span key={group} className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: FAMILY_COLOR[group] }} />
              {group}
              <span className={styles.muted}>{formatBytes(byGroup[group])}</span>
            </span>
          ))}
      </div>
    </div>
  );
}
