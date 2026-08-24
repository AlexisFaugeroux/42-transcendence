import { GateDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamGroup } from '../components/MsnParamGroup/MsnParamGroup';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import { MsnParamToggle } from '../components/MsnParamToggle/MsnParamToggle';
import type { DeviceProps } from './deviceRegistry';
import styles from './NoiseGateDevice.module.scss';

export function NoiseGateDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const gate = project.boxAdapters.adapterFor(effect.box, GateDeviceBoxAdapter);
  const {
    attack,
    floor,
    hold,
    inverse,
    release,
    return: returnLevel,
    threshold,
  } = gate.namedParameter;

  return (
    <div className={styles.gate}>
      <MsnParamGroup direction="column">
        <div className={styles.row}>
          <MsnParamKnob
            param={threshold}
            label="Thresh"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={returnLevel}
            label="Return"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={floor}
            label="Floor"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </div>
        <div className={styles.toggleRow}>
          <MsnParamToggle param={inverse} label="inverse" />
        </div>
      </MsnParamGroup>
      <MsnParamGroup separated="top">
        <MsnParamKnob
          param={attack}
          label="Atk"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={hold}
          label="Hold"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={release}
          label="Rel"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
      </MsnParamGroup>
    </div>
  );
}
