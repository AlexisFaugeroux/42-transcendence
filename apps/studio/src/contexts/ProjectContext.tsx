import type { Project } from '@opendaw/studio-core';
import { useTranslation } from '@transcendence/i18n';
import {
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { initializeOpenDaw } from '../lib/projectSetup';
import type { ProjectProperties } from '../lib/types';

interface ProjectContextValue {
  audioContext: AudioContext;
  project: Project;
  localAudioBuffers: Map<string, AudioBuffer>;
  meta: {
    id: string | null;
    name: string | null;
    visibility: string;
    duration: number;
    renameProject: (name: string) => void;
  };
}

const projectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }): JSX.Element {
  const [value, setValue] = useState<ProjectContextValue | null>(null);
  const localAudioBuffersRef = useRef(new Map<string, AudioBuffer>());
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const query = new URLSearchParams(window.location.search);

      const renameProject = (name: string): void => {
        setValue((prev) => (prev ? { ...prev, meta: { ...prev.meta, name } } : prev));
        const url = new URL(window.location.href);
        url.searchParams.set('name', name);
        window.history.replaceState(window.history.state, '', url);
      };

      const initialMeta: ProjectContextValue['meta'] = {
        duration: 0,
        id: query.get('projectId'),
        name: query.get('name'),
        visibility: 'PRIVATE',
        renameProject,
      };

      const properties: ProjectProperties = {
        ...initialMeta,
        samples: query.getAll('sampleId'),
        state: '',
      };

      const { audioContext, project, id } = await initializeOpenDaw(
        {
          localAudioBuffers: localAudioBuffersRef.current,
        },
        properties,
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;

      const url = new URL(window.location.href);
      url.searchParams.set('projectId', initialMeta.id ?? id);
      window.history.replaceState(window.history.state, '', url);

      setValue({
        audioContext,
        localAudioBuffers: localAudioBuffersRef.current,
        meta: { ...initialMeta, id },
        project,
      });
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
