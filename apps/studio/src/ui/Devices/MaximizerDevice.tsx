import { MaximizerDeviceBoxAdapter } from '@opendaw/studio-adapters';
import { ConfigProvider, Slider, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { useParam } from '../../hooks/useParam';
import type { DeviceProps } from './deviceRegistry';
import styles from './MaximizerDevice.module.scss';

export function MaximizerDevice({ effect }: DeviceProps): JSX.Element {
  const { project } = useProject();
  const maximizer = project.boxAdapters.adapterFor(effect.box, MaximizerDeviceBoxAdapter);
  const { onChange, onChangeEnd, print, value } = useParam(maximizer.namedParameter.threshold);

  return (
    <div className={styles.maximizer}>
      <div className={styles.fader}>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                handleActiveColor: theme.fg1,
                handleColor: theme.fg1,
                handleLineWidth: 3,
                handleLineWidthHover: 3,
                handleSize: 10,
                handleSizeHover: 12,
                railSize: 8,
                trackBg: theme.yellow,
                trackHoverBg: theme.yellow,
              },
            },
          }}
        >
          <Slider
            vertical
            min={0}
            max={1}
            step={0.001}
            value={value}
            tooltip={{ open: false }}
            onChange={onChange}
            onChangeComplete={onChangeEnd}
          />
        </ConfigProvider>
      </div>
      <div className={styles.meta}>
        <span className={styles.label}>Ceiling</span>
        <span className={styles.value}>
          {print.value}
          <span className={styles.unit}>{print.unit}</span>
        </span>
      </div>
    </div>
  );
}
