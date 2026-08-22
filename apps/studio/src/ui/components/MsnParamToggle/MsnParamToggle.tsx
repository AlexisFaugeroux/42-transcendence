import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import clsx from 'clsx';
import { type CSSProperties, type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import styles from './MsnParamToggle.module.scss';

interface MsnParamToggleProps {
  param: AutomatableParameterFieldAdapter<boolean>;
  color: string;
  label?: string;
  // aligne la pastille sur la largeur d'une colonne de knob, pour qu'elle tombe
  // sous le paramètre qu'elle pilote
  column?: boolean;
  size?: 'normal' | 'small';
}

export function MsnParamToggle({
  param,
  color,
  label,
  column = false,
  size = 'normal',
}: MsnParamToggleProps): JSX.Element {
  const { project } = useProject();
  const [isActive, setIsActive] = useState(() => param.getValue());

  useEffect(() => {
    const sub = param.catchupAndSubscribe((obs) => {
      setIsActive(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [param]);

  const toggle = () => {
    project.editing.modify(() => {
      param.setValue(!param.getValue());
    });
  };

  return (
    <div className={clsx(styles.toggle, column && styles.column, size === 'small' && styles.small)}>
      <button
        type="button"
        className={styles.pill}
        style={{ '--accent': color } as CSSProperties}
        aria-pressed={isActive}
        title={param.name}
        onClick={toggle}
      >
        {label ?? param.name}
      </button>
    </div>
  );
}
