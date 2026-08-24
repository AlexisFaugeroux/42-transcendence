import { TidalDeviceBoxAdapter } from '@opendaw/studio-adapters';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamGroup } from '../components/MsnParamGroup/MsnParamGroup';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import { MsnParamSelect } from '../components/MsnParamSelect/MsnParamSelect';
import type { DeviceProps } from './deviceRegistry';
import styles from './TremoloAutopanDevice.module.scss';

const RATE_OPTIONS = TidalDeviceBoxAdapter.RateFractions.map(([numerator, denominator], index) => ({
  label: `${numerator}/${denominator}`,
  value: index,
}));

export function TremoloAutopanDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const tidal = project.boxAdapters.adapterFor(effect.box, TidalDeviceBoxAdapter);
  const { channelOffset, depth, offset, rate, slope, symmetry } = tidal.namedParameter;

  return (
    <div className={styles.tremolo}>
      <MsnParamSelect param={rate} options={RATE_OPTIONS} label="Rate" />
      <div className={styles.knobs}>
        <MsnParamGroup direction="column">
          <MsnParamKnob
            param={depth}
            label="Depth"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={slope}
            label="Slope"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
        <MsnParamGroup direction="column">
          <MsnParamKnob
            param={symmetry}
            label="Sym"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={offset}
            label="Offset"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
        <MsnParamGroup direction="column" separated="left">
          <MsnParamKnob
            param={channelOffset}
            label="Channel"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </MsnParamGroup>
      </div>
    </div>
  );
}
