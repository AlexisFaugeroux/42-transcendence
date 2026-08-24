import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { CompressorDeviceBoxAdapter } from '@opendaw/studio-adapters';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import { MsnParamToggle } from '../components/MsnParamToggle/MsnParamToggle';
import styles from './CompressorDevice.module.scss';
import type { DeviceProps } from './deviceRegistry';

function useBooleanValue(param: AutomatableParameterFieldAdapter<boolean>): boolean {
  const [value, setValue] = useState(() => param.getValue());

  useEffect(() => {
    const sub = param.catchupAndSubscribe(() => {
      setValue(param.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [param]);

  return value;
}

export function CompressorDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const compressor = project.boxAdapters.adapterFor(effect.box, CompressorDeviceBoxAdapter);
  const {
    attack,
    autoattack,
    automakeup,
    autorelease,
    inputgain,
    knee,
    lookahead,
    makeup,
    mix,
    ratio,
    release,
    threshold,
  } = compressor.namedParameter;

  const isAutoAttack = useBooleanValue(autoattack);
  const isAutoRelease = useBooleanValue(autorelease);
  const isAutoMakeup = useBooleanValue(automakeup);

  return (
    <div className={styles.compressor}>
      <div className={styles.row}>
        <MsnParamKnob
          param={inputgain}
          label="Input"
          size="normal"
          disabled={false}
          anchor={0.5}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={threshold}
          label="Thresh"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={ratio}
          label="Ratio"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={knee}
          label="Knee"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
      </div>
      <div className={styles.row}>
        <MsnParamKnob
          param={attack}
          label="Atk"
          size="normal"
          disabled={isAutoAttack}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={release}
          label="Rel"
          size="normal"
          disabled={isAutoRelease}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={makeup}
          label="Makeup"
          size="normal"
          disabled={isAutoMakeup}
          anchor={0.5}
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
      <div className={styles.row}>
        <MsnParamToggle param={autoattack} label="auto" column />
        <MsnParamToggle param={autorelease} label="auto" column />
        <MsnParamToggle param={automakeup} label="auto" column />
        <div className={styles.cell} />
      </div>
      <div className={styles.row}>
        <MsnParamToggle param={lookahead} label="lookahead" />
      </div>
    </div>
  );
}
