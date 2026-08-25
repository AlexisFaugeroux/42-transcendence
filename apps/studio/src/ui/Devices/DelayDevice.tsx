import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { DelayDeviceBoxAdapter } from '@opendaw/studio-adapters';
import { MsnKnob, TinyDesign } from '@transcendence/ui';
import type { JSX } from 'react';
import { useParam } from '../../hooks/useParam';
import { useProject } from '../../contexts/ProjectContext';
import { MsnParamGroup } from '../components/MsnParamGroup/MsnParamGroup';
import { MsnParamKnob } from '../components/MsnParamKnob/MsnParamKnob';
import { MsnParamSelect } from '../components/MsnParamSelect/MsnParamSelect';
import styles from './DelayDevice.module.scss';
import type { DeviceProps } from './deviceRegistry';

const FRACTION_OPTIONS = DelayDeviceBoxAdapter.Fractions.map(([numerator, denominator], index) => ({
  label: `${numerator}/${denominator}`,
  value: index,
}));

interface TimeRowProps {
  fraction: AutomatableParameterFieldAdapter<number>;
  millis: AutomatableParameterFieldAdapter<number>;
  label: string;
}

function TimeRow({ fraction, millis, label }: TimeRowProps): JSX.Element {
  const { anchor, onChange, onChangeEnd, print, value } = useParam(millis);

  return (
    <div className={styles.timeRow}>
      <MsnParamSelect param={fraction} options={FRACTION_OPTIONS} label={label} />
      <span className={styles.plus}>+</span>
      <MsnKnob
        value={value}
        anchor={anchor}
        design={TinyDesign}
        color="var(--accent)"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
      <span className={styles.ms}>
        {print.value}
        <span className={styles.unit}>{print.unit}</span>
      </span>
    </div>
  );
}

export function DelayDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const delayAdapter = project.boxAdapters.adapterFor(effect.box, DelayDeviceBoxAdapter);
  const {
    cross,
    delay,
    dry,
    feedback,
    filter,
    lfoDepth,
    lfoSpeed,
    millisTime,
    preMillisTimeLeft,
    preMillisTimeRight,
    preSyncTimeLeft,
    preSyncTimeRight,
    wet,
  } = delayAdapter.namedParameter;

  return (
    <div className={styles.delay}>
      <div className={styles.times}>
        <TimeRow fraction={delay} millis={millisTime} label="Time" />
        <TimeRow fraction={preSyncTimeLeft} millis={preMillisTimeLeft} label="Pre L" />
        <TimeRow fraction={preSyncTimeRight} millis={preMillisTimeRight} label="Pre R" />
      </div>
      <MsnParamGroup separated="left" direction="column">
        <div className={styles.row}>
          <MsnParamKnob
            param={feedback}
            label="Feedbk"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={cross}
            label="Cross"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
          <MsnParamKnob
            param={filter}
            label="Filter"
            size="normal"
            disabled={false}
            color="var(--accent)"
          />
        </div>
        <div className={styles.row}>
          <MsnParamGroup heading="lfo">
            <MsnParamKnob
              param={lfoSpeed}
              label="Speed"
              size="small"
              disabled={false}
              color="var(--accent)"
            />
            <MsnParamKnob
              param={lfoDepth}
              label="Depth"
              size="small"
              disabled={false}
              color="var(--accent)"
            />
          </MsnParamGroup>
          <MsnParamGroup heading="mix">
            <MsnParamKnob
              param={dry}
              label="Dry"
              size="small"
              disabled={false}
              color="var(--accent)"
            />
            <MsnParamKnob
              param={wet}
              label="Wet"
              size="small"
              disabled={false}
              color="var(--accent)"
            />
          </MsnParamGroup>
        </div>
      </MsnParamGroup>
    </div>
  );
}
