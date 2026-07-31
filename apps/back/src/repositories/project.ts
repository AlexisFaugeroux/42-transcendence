import { formatISO } from '@transcendence/date';
import type { GetProjectInput, Project, UpsertProjectInput } from '../domain/project';
import type { AudioFile, PrismaClient, StudioProject } from '../generated/prisma/client';
import { toArrayBuffer } from '../utils/bytes';
import { prisma } from '../utils/prisma';
import { mapError } from './helpers';

class ProjectRepository {
  private readonly prisma: PrismaClient;

  constructor(client: PrismaClient) {
    this.prisma = client;
  }

  public async upsert(input: UpsertProjectInput): Promise<Project> {
    try {
      const { ownerId, samples, state, ...scalars } = input;

      const samplesRef = samples?.map((id) => ({ id })) ?? [];

      const upsertProject = await this.prisma.studioProject.upsert({
        create: {
          ...scalars,
          owner: { connect: { id: ownerId } },
          samples: { connect: samplesRef },
          state,
        },
        include: { samples: { select: { id: true } } },
        update: {
          ...scalars,
          owner: { connect: { id: ownerId } },
          state,
          samples: {
            set: samplesRef,
          },
        },
        where: { id: input.id },
      });

      const formattedProject = this._format(upsertProject);

      return formattedProject;
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }

  public async findById(id: string): Promise<Project> {
    try {
      const project = await prisma.studioProject.findUniqueOrThrow({
        include: { samples: { select: { id: true } } },
        where: { id },
      });

      const formattedProject = this._format(project);

      return formattedProject;
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }

  public async get(input: GetProjectInput): Promise<Project[]> {
    const filters = this._buildFilters(input);

    const where = Object.keys(filters).length ? filters : undefined;

    const projects = await this.prisma.studioProject.findMany({
      include: { samples: { select: { id: true } } },
      where,
    });

    const formattedProjects = projects.map((project) => this._format(project));

    return formattedProjects;
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.studioProject.delete({ where: { id } });
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }

  private _format(project: StudioProject & { samples: Pick<AudioFile, 'id'>[] }): Project {
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

  private _buildFilters(input: GetProjectInput) {
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
}

export const projectRepository = new ProjectRepository(prisma);
