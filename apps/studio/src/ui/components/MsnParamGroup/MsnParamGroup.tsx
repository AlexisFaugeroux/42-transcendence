import clsx from 'clsx';
import type { JSX, ReactNode } from 'react';
import styles from './MsnParamGroup.module.scss';

interface MsnParamGroupProps {
  children: ReactNode;
  heading?: string;
  separated?: boolean;
  direction?: 'row' | 'column';
}

export function MsnParamGroup({
  children,
  heading,
  separated = false,
  direction = 'row',
}: MsnParamGroupProps): JSX.Element {
  return (
    <div className={clsx(styles.group, separated && styles.separated)}>
      {heading ? <span className={styles.heading}>{heading}</span> : null}
      <div className={clsx(styles.content, styles[direction])}>{children}</div>
    </div>
  );
}
