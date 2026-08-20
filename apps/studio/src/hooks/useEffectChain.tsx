import { useEffect, useState } from 'react';
import type { AudioEffectDeviceAdapter, AudioUnitBoxAdapter } from '@opendaw/studio-adapters';

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

    return () => {
      sub.terminate();
    };
  }, [audioUnit]);

  return effects;
}
