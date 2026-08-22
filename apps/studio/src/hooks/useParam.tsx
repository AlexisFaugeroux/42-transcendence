import type { AutomatableParameterFieldAdapter } from '@opendaw/studio-adapters';
import { useCallback, useEffect, useState } from 'react';
import { useProject } from '../contexts/ProjectContext';

export function useParam(param: AutomatableParameterFieldAdapter<number>) {
  const { project } = useProject();
  const [value, setValue] = useState(() => param.getUnitValue());

  useEffect(() => {
    const sub = param.catchupAndSubscribe((obs) => {
      setValue(obs.getUnitValue());
    });

    return () => {
      sub.terminate();
    };
  }, [param]);

  const onChange = useCallback(
    (v: number) => {
      project.editing.modify(() => {
        param.setUnitValue(v);
      }, false);
    },
    [project.editing, param],
  );

  const onChangeEnd = useCallback(() => {
    project.editing.mark();
  }, [project.editing]);

  const print = param.getPrintValue();

  return {
    anchor: param.anchor,
    onChange,
    onChangeEnd,
    print,
    value,
  };
}
