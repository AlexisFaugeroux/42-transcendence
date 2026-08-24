import { StereoToolDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import { MsnParamToggle } from '../components/MsnParamToggle/MsnParamToggle';
import type { DeviceProps } from './deviceRegistry';
import styles from './StereoToolDevice.module.scss';

export function StereoToolDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const stereoTool = project.boxAdapters.adapterFor(effect.box, StereoToolDeviceBoxAdapter);
  const { invertL, invertR, panning, stereo, swap, volume } = stereoTool.namedParameter;

  return (
    <div className={styles.stereoTool}>
      <div className={styles.knobs}>
        <MsnParamKnob
          param={volume}
          label="Volume"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={panning}
          label="Pan"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
        <MsnParamKnob
          param={stereo}
          label="Width"
          size="normal"
          disabled={false}
          color="var(--accent)"
        />
      </div>
      <div className={styles.toggles}>
        <MsnParamToggle param={invertL} label="ø L" />
        <MsnParamToggle param={invertR} label="ø R" />
        <MsnParamToggle param={swap} label="⇄ swap" />
      </div>
    </div>
  );
}
