import clsx from 'clsx';
import type { JSX, ReactNode } from 'react';
import styles from './MsnParamGroup.module.scss';

interface MsnParamGroupProps {
  children: ReactNode;
  heading?: string;
  separated?: 'left' | 'top';
  direction?: 'row' | 'column';
}

export function MsnParamGroup({
  children,
  heading,
  separated,
  direction = 'row',
}: MsnParamGroupProps): JSX.Element {
  return (
    <div
      className={clsx(
        styles.group,
        separated === 'left' && styles.separatedLeft,
        separated === 'top' && styles.separatedTop,
      )}
    >
      {heading ? <span className={styles.heading}>{heading}</span> : null}
      <div className={clsx(styles.content, styles[direction])}>{children}</div>
    </div>
  );
}
