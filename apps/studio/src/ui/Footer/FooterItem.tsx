import { theme } from '@transcendence/ui';
import type { JSX, ReactNode } from 'react';
import styles from './FooterItem.module.scss';

interface FooterItemProps {
  accent?: string;
  label: string;
  value: string | ReactNode;
}

export function FooterItem({ accent, label, value }: FooterItemProps): JSX.Element {
  return (
    <span className={styles.itemContainer}>
      <span className={styles.itemLabel}>{label}</span>
      <span
        className={styles.itemValue}
        style={{
          color: accent ?? theme.fg1,
        }}
      >
        {value}
      </span>
    </span>
  );
}
