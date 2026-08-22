import { type AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { ConfigProvider, Select } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import styles from './MsnParamSelect.module.scss';

interface MsnParamSelectProps {
  param: AutomatableParameterFieldAdapter<number>;
  // mutable : c'est ce qu'attend la prop `options` d'antd
  options: { label: string; value: number }[];
  label?: string;
}

export function MsnParamSelect({ param, label, options }: MsnParamSelectProps): JSX.Element {
  const { project } = useProject();
  const [value, setValue] = useState(() => param.getValue());

  useEffect(() => {
    const sub = param.catchupAndSubscribe((obs) => {
      setValue(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [param]);

  return (
    <div className={styles.select}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <ConfigProvider
        theme={{
          components: {
            Select: {
              controlHeightSM: 16,
              fontSize: 10,
              paddingSM: 4,
              optionFontSize: 10,
              optionHeight: 18,
              optionLineHeight: 1.4,
              optionPadding: '1px 6px',
            },
          },
        }}
      >
        <Select
          options={options}
          value={value}
          size="small"
          classNames={{ popup: { root: styles.popup }, root: styles.control }}
          onChange={(index) => {
            project.editing.modify(() => {
              param.setValue(index);
            });
          }}
        />
      </ConfigProvider>
    </div>
  );
}
