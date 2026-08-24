import { DattorroReverbDeviceBoxAdapter } from '@opendaw/studio-adapters';
import clsx from 'clsx';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamGroup } from '../components/MsnParamGroup/MsnParamGroup';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import styles from './DattorroReverbDevice.module.scss';
import type { DeviceProps } from './deviceRegistry';

export function DattorroReverbDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const dattorro = project.boxAdapters.adapterFor(effect.box, DattorroReverbDeviceBoxAdapter);
  const {
    bandwidth,
    damping,
    decay,
    decayDiffusion1,
    decayDiffusion2,
    dry,
    excursionDepth,
    excursionRate,
    inputDiffusion1,
    inputDiffusion2,
    preDelay,
    wet,
  } = dattorro.namedParameter;

  return (
    <div className={styles.dattorro}>
      <div className={styles.row}>
        <MsnParamGroup>
          <MsnParamKnob
            param={preDelay}
            label="Pre-Dly"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={bandwidth}
            label="BW"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={decay}
            label="Decay"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={damping}
            label="Damp"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
        <MsnParamGroup separated="left">
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
      <div className={clsx(styles.row, styles.groups)}>
        <MsnParamGroup heading="input diff">
          <MsnParamKnob
            param={inputDiffusion1}
            label="1"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={inputDiffusion2}
            label="2"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
        <MsnParamGroup heading="decay diff">
          <MsnParamKnob
            param={decayDiffusion1}
            label="1"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={decayDiffusion2}
            label="2"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
        <MsnParamGroup heading="exc">
          <MsnParamKnob
            param={excursionRate}
            label="Rate"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={excursionDepth}
            label="Depth"
            size="small"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
      </div>
    </div>
  );
}
