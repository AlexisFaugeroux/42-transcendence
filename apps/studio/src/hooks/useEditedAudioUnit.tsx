import { AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { useEffect, useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { AudioUnitBox } from '@opendaw/studio-boxes';

export function useEditedAudioUnit(): AudioUnitBoxAdapter | null {
  const { project } = useProject();
  const [audioUnit, setAudioUnit] = useState<AudioUnitBoxAdapter | null>(null);

  useEffect(() => {
    const sub = project.userEditingManager.audioUnit.catchupAndSubscribe((option) => {
      setAudioUnit(
        option.match({
          none: () => null,
          some: (vertex) =>
            vertex.box instanceof AudioUnitBox
              ? project.boxAdapters.adapterFor(vertex.box, AudioUnitBoxAdapter)
              : null,
        }),
      );
    });

    return () => {
      sub.terminate();
    };
  }, [project.userEditingManager.audioUnit]);

  return audioUnit;
}
