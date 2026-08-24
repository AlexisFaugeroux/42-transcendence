import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import clsx from 'clsx';
import { type CSSProperties, type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import styles from './MsnParamToggle.module.scss';

interface MsnParamToggleProps {
  param: AutomatableParameterFieldAdapter<boolean>;
  color?: string;
  label?: string;
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
        style={color ? ({ '--accent': color } as CSSProperties) : undefined}
        aria-pressed={isActive}
        title={param.name}
        onClick={toggle}
      >
        {label ?? param.name}
      </button>
    </div>
  );
}
