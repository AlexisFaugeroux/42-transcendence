import { formatISO } from '@transcendence/date';
import type { GetProjectInput, Project } from '../../domain/project';
import type { Sample, StudioProject } from '../../generated/prisma/client';
import { toArrayBuffer } from '../../utils/bytes';

export function formatProject(project: StudioProject & { samples: Pick<Sample, 'id'>[] }): Project {
  const { createdAt, key, mode, samples, state, updatedAt, visibility, ...rest } = project;

  const buffer = toArrayBuffer(state);
  const encodedState = Buffer.from(buffer).toString('base64');

  const formattedSamples = samples.map(({ id }) => id);

  const formattedCreatedAt = formatISO(createdAt);
  const formattedUpdatedAt = formatISO(updatedAt);

  return {
    ...rest,
    createdAt: formattedCreatedAt,
    key: key ?? undefined,
    mode: mode ?? undefined,
    samples: formattedSamples,
    state: encodedState,
    updatedAt: formattedUpdatedAt,
  };
}

export function buildFilters(input: GetProjectInput) {
  const { ids, ownerIds, visibilities } = input;

  const idFilter = ids?.length ? { id: { in: ids } } : undefined;
  const ownerIdFilter = ownerIds?.length ? { ownerId: { in: ownerIds } } : undefined;
  const visibilityFilter = visibilities?.length ? { visibility: { in: visibilities } } : undefined;

  return {
    ...idFilter,
    ...ownerIdFilter,
    ...visibilityFilter,
  };
}
