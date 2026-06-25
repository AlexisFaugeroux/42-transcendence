import type { JSX } from 'react';
import styles from './PanelFrame.module.scss';
import { type Panel, panels } from './panels';

interface PanelFramePros {
  id: Panel['id'];
  icon: string;
  className?: string;
  isVisible: (id: Panel['id']) => boolean;
  onToggle: (id: Panel['id']) => void;
}

export function PanelFrame({ className, id, icon, isVisible, onToggle }: PanelFramePros): JSX.Element | null {
  const panel = panels[id];

  const { header: Header, label, main: Main } = panel;

  return (
    <div className={`${styles.panelFrame} ${className ?? ''}`}>
      <Header icon={icon} id={id} label={label} isVisible={isVisible} onToggle={onToggle} />
      {isVisible(id) ? (
        <div className={styles.panelBody}>
          <Main />
        </div>
      ) : null}
    </div>
  );
}
