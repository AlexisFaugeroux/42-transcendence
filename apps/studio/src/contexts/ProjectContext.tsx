import type { Project } from '@opendaw/studio-core';
import { useTranslation } from '@transcendence/i18n';
import { createContext, type JSX, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
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
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { audioContext, project } = await initializeOpenDaw({
        localAudioBuffers: localAudioBuffersRef.current,
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;
      setValue({ audioContext, localAudioBuffers: localAudioBuffersRef.current, project });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (!value) return <div>{t('common.loading')}</div>;

  return <projectContext.Provider value={value}>{children}</projectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(projectContext);
  if (!ctx) throw new Error('useProject used outside a ProjectProvider');
  return ctx;
}
