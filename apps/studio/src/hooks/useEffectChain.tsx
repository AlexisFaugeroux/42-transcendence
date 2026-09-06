import type { AudioEffectDeviceAdapter, AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { useEffect, useState } from 'react';

export function useEffectChain(audioUnit: AudioUnitBoxAdapter | null) {
  const [effects, setEffects] = useState<readonly AudioEffectDeviceAdapter[]>([]);

  useEffect(() => {
    if (!audioUnit) {
      setEffects([]);
      return;
    }

    const reload = () => {
      setEffects(audioUnit.audioEffects.adapters());
    };

    const sub = audioUnit.audioEffects.catchupAndSubscribe({
      onAdd: reload,
      onRemove: reload,
      onReorder: reload,
    });

    setEffects(audioUnit.audioEffects.adapters());

    return () => {
      sub.terminate();
    };
  }, [audioUnit]);

  return effects;
}
