import type { JSX, ReactNode } from 'react';
import styles from './HeaderIconButton.module.scss';

interface HeaderIconButtonProps {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}

export function HeaderIconButton({ children, label, onClick }: HeaderIconButtonProps): JSX.Element {
  return (
    <button className={styles.button} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}
