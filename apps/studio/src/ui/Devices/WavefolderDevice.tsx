import { FoldDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import type { DeviceProps } from './deviceRegistry';
import styles from './WavefolderDevice.module.scss';

export function WavefolderDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const fold = project.boxAdapters.adapterFor(effect.box, FoldDeviceBoxAdapter);
  const { drive, volume } = fold.namedParameter;

  return (
    <div className={styles.wavefolder}>
      <MsnParamKnob
        param={drive}
        label="Drive"
        size="normal"
        disabled={false}
        color="var(--accent)"
      />
      <MsnParamKnob
        param={volume}
        label="Volume"
        size="normal"
        disabled={false}
        color="var(--accent)"
      />
    </div>
  );
}
