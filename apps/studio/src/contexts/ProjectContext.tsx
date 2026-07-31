import type { Project } from '@opendaw/studio-core';
import { useTranslation } from '@transcendence/i18n';
import { createContext, type JSX, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { initializeOpenDaw } from '../lib/projectSetup';
import type { ProjectProperties } from '../lib/types'

interface ProjectContextValue {
  audioContext: AudioContext;
  project: Project;
  localAudioBuffers: Map<string, AudioBuffer>;
  meta : {
    id : string | null,
    name : string | null,
    visibility : string,
    key : string,
    mode : string,
    duration : number,
  }
}

const projectContext = createContext<ProjectContextValue | null>(null);


export function ProjectProvider({ children }: { children: ReactNode }): JSX.Element {
  const [value, setValue] = useState<ProjectContextValue | null>(null);
  const localAudioBuffersRef = useRef(new Map<string, AudioBuffer>());
  const { t } = useTranslation();
  const query = new URLSearchParams( window.location.search);
  const meta = {
    id : query.get('projectId'),
    name : query.get('name'),
    key : "A_key",
    mode : "MAJOR",
    duration : 0,
    visibility : 'PRIVATE',
  }

  const properties : ProjectProperties = {
    ...meta,
    bpm : Number ( query.get('bpm') ),
    samples : query.getAll( 'sampleId' ),
    state : ""
  }

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const { audioContext, project, id } = await initializeOpenDaw(
        {
          localAudioBuffers: localAudioBuffersRef.current,
        },
        properties
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;
      meta.id = id;
      const url = new URL(window.location.href);
      url.searchParams.set('projectId', id);
      window.history.replaceState(window.history.state, '', url);
      setValue({ audioContext, localAudioBuffers: localAudioBuffersRef.current, project, meta });
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
