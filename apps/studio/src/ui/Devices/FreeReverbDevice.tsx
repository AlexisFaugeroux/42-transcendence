import { ReverbDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamGroup } from '../components/MsnParamGroup/MsnParamGroup';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import type { DeviceProps } from './deviceRegistry';
import styles from './FreeReverbDevice.module.scss';

export function FreeReverbDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const reverb = project.boxAdapters.adapterFor(effect.box, ReverbDeviceBoxAdapter);
  const { damp, decay, dry, filter, preDelay, wet } = reverb.namedParameter;

  return (
    <div className={styles.reverb}>
      <MsnParamGroup>
        <MsnParamKnob
          param={decay}
          label="Room"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={preDelay}
          label="Pre-Dly"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={damp}
          label="Damp"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={filter}
          label="Filter"
          size="normal"
          disabled={false}
          anchor={0.5}
          color="var(--accent)"
        />
      </MsnParamGroup>
      <MsnParamGroup separated="top">
        <MsnParamKnob
          param={dry}
          label="Dry"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={wet}
          label="Wet"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
      </MsnParamGroup>
    </div>
  );
}
