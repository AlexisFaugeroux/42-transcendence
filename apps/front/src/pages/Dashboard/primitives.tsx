import type { JSX, ReactNode } from 'react';
import styles from './primitives.module.scss';

export function SectionHeader({
  right,
  subtitle,
  title,
}: {
  title: ReactNode;
  subtitle?: string;
  right?: ReactNode;
}): JSX.Element {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }): JSX.Element {
  return <div className={styles.card}>{children}</div>;
}

export function Row({
  children,
  hint,
  label,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.rowLabel}>{label}</div>
        {hint ? <div className={styles.rowHint}>{hint}</div> : null}
      </div>
      <div className={styles.rowBody}>{children}</div>
    </div>
  );
}

export function Hr(): JSX.Element {
  return <div className={styles.hr} />;
}
