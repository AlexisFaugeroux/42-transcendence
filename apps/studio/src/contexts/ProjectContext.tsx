import type { Project } from '@opendaw/studio-core';
import { useTranslation } from '@transcendence/i18n';
import {
  createContext,
  type JSX,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { initializeOpenDaw } from '../lib/projectSetup';
import type { ProjectProperties } from '../lib/types';

export interface ProjectMeta {
  id: string | null;
  name: string | null;
  visibility: string;
  duration: number;
}

interface ProjectContextValue {
  audioContext: AudioContext;
  project: Project;
  localAudioBuffers: Map<string, AudioBuffer>;
  meta: ProjectMeta;
  renameProject: (name: string) => void;
}

const projectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }): JSX.Element {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [meta, setMeta] = useState<ProjectMeta | null>(null);
  const localAudioBuffersRef = useRef(new Map<string, AudioBuffer>());
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const query = new URLSearchParams(window.location.search);
      const initialMeta: ProjectMeta = {
        duration: 0,
        id: query.get('projectId'),
        name: query.get('name'),
        visibility: 'PRIVATE',
      };

      const properties: Omit<ProjectProperties, 'bpm'> = {
        ...initialMeta,
        samples: query.getAll('sampleId'),
        state: '',
      };

      const result = await initializeOpenDaw(
        {
          localAudioBuffers: localAudioBuffersRef.current,
        },
        properties,
      );
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mounted) return;

      const nextMeta: ProjectMeta = { ...initialMeta, id: result.id };
      const url = new URL(window.location.href);
      url.searchParams.set('projectId', result.id);
      window.history.replaceState(window.history.state, '', url);

      setAudioContext(result.audioContext);
      setProject(result.project);
      setMeta(nextMeta);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const renameProject = useCallback((name: string): void => {
    setMeta((prev) => (prev ? { ...prev, name } : prev));
    const url = new URL(window.location.href);
    url.searchParams.set('name', name);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  if (!audioContext || !project || !meta) return <div>{t('common.loading')}</div>;

  return (
    <projectContext.Provider
      value={{
        audioContext,
        localAudioBuffers: localAudioBuffersRef.current,
        meta,
        project,
        renameProject,
      }}
    >
      {children}
    </projectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(projectContext);
  if (!ctx) throw new Error('useProject used outside a ProjectProvider');
  return ctx;
}
