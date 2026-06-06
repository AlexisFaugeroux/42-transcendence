import type { Project } from '@opendaw/studio-core';
import { createContext, useContext, useEffect, useRef, useState, type JSX, type ReactNode } from 'react';
import { initializeOpenDaw } from '../lib/projectSetup';

interface ProjectContextValue {
  audioContext: AudioContext;
  project: Project;
  localAudioBuffers: Map<string, AudioBuffer>;
}

const projectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }): JSX.Element {
  const [value, setValue] = useState<ProjectContextValue | null>(null);
  const localAudioBuffersRef = useRef(new Map<string, AudioBuffer>());

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { audioContext, project } = await initializeOpenDaw({
        localAudioBuffers: localAudioBuffersRef.current,
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;
      setValue({ audioContext, project, localAudioBuffers: localAudioBuffersRef.current });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (!value) return <div>Loading...</div>;

  return <projectContext.Provider value={value}>{children}</projectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(projectContext);
  if (!ctx) throw new Error('useProject used outside a ProjectProvider');
  return ctx;
}
