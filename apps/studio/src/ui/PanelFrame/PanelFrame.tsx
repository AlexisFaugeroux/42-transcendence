import type { JSX } from 'react';
import type { StudioIconLabel } from '../components/StudioIcon/types';
import styles from './PanelFrame.module.scss';
import { type Panel, panels } from './panels';

interface PanelFramePros {
  id: Panel['id'];
  icon: StudioIconLabel;
  className?: string;
  isVisible: (id: Panel['id']) => boolean;
  onToggle: (id: Panel['id']) => void;
}

export function PanelFrame({
  className,
  icon,
  id,
  isVisible,
  onToggle,
}: PanelFramePros): JSX.Element | null {
  const panel = panels[id];

  const { header: Header, labelKey, main: Main } = panel;

  return (
    <div className={`${styles.panelFrame} ${className ?? ''}`}>
      <Header icon={icon} id={id} labelKey={labelKey} isVisible={isVisible} onToggle={onToggle} />
      {isVisible(id) ? (
        <div className={styles.panelBody}>
          <Main />
        </div>
      ) : null}
    </div>
  );
}
