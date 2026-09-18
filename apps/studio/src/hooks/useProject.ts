import { UUID } from '@opendaw/lib-std';
import type { Project } from '@opendaw/studio-core';
import { useMutation } from '@tanstack/react-query';
import { saveProject } from '../api/project';
import { useProject } from '../contexts/ProjectContext';
import type { ProjectProperties } from '../lib/types';
import { arrayBufferToBase64 } from '../utils/base64';

interface ProjectMeta {
  id: string | null;
  name: string | null;
  visibility: string;
  duration: number;
  renameProject: (name: string) => void;
}

function buildPayload(meta: ProjectMeta, project: Project, name = meta.name): ProjectProperties {
  return {
    bpm: project.timelineBox.bpm.getValue(),
    duration: meta.duration,
    id: meta.id,
    name,
    samples: project.collectSampleUUIDs().map((uuid) => UUID.toString(uuid)),
    state: arrayBufferToBase64(project.toArrayBuffer()),
    visibility: meta.visibility,
  };
}

export function useSaveProject() {
  const { meta, project } = useProject();

  return useMutation({
    mutationFn: () => saveProject(buildPayload(meta, project)),
    onSuccess: () => {
      project.editing.markSaved();
    },
  });
}

export function useRenameProject() {
  const { meta, project } = useProject();

  return useMutation({
    mutationFn: (name: string) => saveProject(buildPayload(meta, project, name)),
    onSuccess: (_data, name) => {
      meta.renameProject(name);
      project.editing.markSaved();
    },
  });
}
