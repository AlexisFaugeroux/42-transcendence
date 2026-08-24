import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { CrusherDeviceBoxAdapter } from '@opendaw/studio-adapters';
import clsx from 'clsx';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import styles from './BitcrusherDevice.module.scss';
import type { DeviceProps } from './deviceRegistry';

const BIT_COUNT = 16;

function BitsBar({ param }: { param: AutomatableParameterFieldAdapter<number> }): JSX.Element {
  const { project } = useProject();
  const [bits, setBits] = useState(() => param.getValue());

  useEffect(() => {
    const sub = param.catchupAndSubscribe(() => {
      setBits(param.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [param]);

  return (
    <div className={styles.bits}>
      <div className={styles.bitsHead}>
        <span>Bits</span>
        <span className={styles.bitsValue}>{bits}</span>
      </div>
      <div className={styles.bitsBar}>
        {Array.from({ length: BIT_COUNT }, (_, index) => index + 1).map((value) => (
          <button
            key={value}
            type="button"
            className={clsx(styles.segment, value <= bits && styles.on)}
            aria-label={`${value} bits`}
            aria-pressed={value === bits}
            onClick={() => {
              project.editing.modify(() => {
                param.setValue(value);
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function BitcrusherDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const crusher = project.boxAdapters.adapterFor(effect.box, CrusherDeviceBoxAdapter);
  const { bits, boost, crush, mix } = crusher.namedParameter;

  return (
    <div className={styles.bitcrusher}>
      <BitsBar param={bits} />
      <div className={styles.knobs}>
        <MsnParamKnob
          param={crush}
          label="Crush"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={boost}
          label="Boost"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={mix}
          label="Mix"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
      </div>
    </div>
  );
}
