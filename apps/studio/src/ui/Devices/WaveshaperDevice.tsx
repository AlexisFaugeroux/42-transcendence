import { WaveshaperDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import type { DeviceProps } from './deviceRegistry';
import styles from './WaveshaperDevice.module.scss';

export function WaveshaperDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const waveshaper = project.boxAdapters.adapterFor(effect.box, WaveshaperDeviceBoxAdapter);
  const { inputGain, mix, outputGain } = waveshaper.namedParameter;

  return (
    <div className={styles.waveshaper}>
      <MsnParamKnob
        param={inputGain}
        label="Input"
        size="normal"
        disabled={false}
        color="var(--accent)"
      />
      <span className={styles.glyph} aria-hidden="true">
        ∫
      </span>
      <MsnParamKnob
        param={outputGain}
        label="Output"
        size="normal"
        disabled={false}
        anchor={0.5}
        color="var(--accent)"
      />
      <MsnParamKnob param={mix} label="Mix" size="normal" disabled={false} color="var(--accent)" />
    </div>
  );
}
