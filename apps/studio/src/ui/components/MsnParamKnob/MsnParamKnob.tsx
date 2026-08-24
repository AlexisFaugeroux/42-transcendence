import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { DefaultDesign, MsnKnob, TinyDesign } from '@transcendence/ui';
import type { JSX } from 'react';
import { useParam } from '../../../hooks/useParam';
import styles from './MsnParamKnob.module.scss';

interface MsnParamKnobProps {
  anchor?: number;
  color?: string;
  param: AutomatableParameterFieldAdapter<number>;
  label: string;
  size: 'normal' | 'small';
  disabled: boolean;
}

export function MsnParamKnob({
  anchor,
  color,
  param,
  label,
  size,
  disabled,
}: MsnParamKnobProps): JSX.Element {
  const { anchor: paramAnchor, value, onChange, onChangeEnd, print } = useParam(param);

  return (
    <div
      className={`${styles.param} ${size === 'small' && styles.small} ${disabled && styles.disabled}`}
    >
      <MsnKnob
        anchor={anchor ?? paramAnchor}
        color={color}
        value={value}
        onChange={disabled ? undefined : onChange}
        onChangeEnd={disabled ? undefined : onChangeEnd}
        design={size === 'normal' ? DefaultDesign : TinyDesign}
      />
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {print.value}
        <span className={styles.unit}>{print.unit}</span>
      </span>
    </div>
  );
}
