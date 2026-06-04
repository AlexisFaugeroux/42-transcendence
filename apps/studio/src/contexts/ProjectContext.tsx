import type { Project } from '@opendaw/studio-core';
import { createContext, useContext } from 'react';

interface ProjectContext {
  audioContext: AudioContext;
  project: Project;
}

const projectContext = createContext<ProjectContext | null>(null);

export const ProjectProvider = projectContext.Provider;

export function useProject() {
  const ctx = useContext(projectContext);
  if (!ctx) throw new Error('useProject used outside a ProjectProvider');
  return ctx;
}
