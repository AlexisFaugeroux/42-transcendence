import type {
  GetProjectInput,
  Project,
  UpdateProjectInput,
  UpsertProjectInput,
} from '../../domain/project';
import type { PrismaClient } from '../../generated/prisma/client';
import { prisma } from '../../utils/prisma';
import { mapError } from '../helpers';
import { buildFilters, formatProject } from './helpers';

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
          bpm: scalars.bpm ?? 0,
          owner: { connect: { id: ownerId } },
          samples: { connect: samplesRef },
          state,
        },
        include: { samples: { select: { id: true } } },
        update: {
          ...scalars,
          owner: { connect: { id: ownerId } },
          samples: {
            set: samplesRef,
          },
          state,
        },
        where: { id: input.id },
      });

      const formattedProject = formatProject(upsertProject);

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

      const formattedProject = formatProject(project);

      return formattedProject;
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }

  public async get(input: GetProjectInput): Promise<Project[]> {
    const filters = buildFilters(input);

    const where = Object.keys(filters).length ? filters : undefined;

    const projects = await this.prisma.studioProject.findMany({
      include: { samples: { select: { id: true } } },
      where,
    });

    const formattedProjects = projects.map((project) => formatProject(project));

    return formattedProjects;
  }

  public async update(id: string, input: UpdateProjectInput): Promise<Project> {
    try {
      const updatedProject = await this.prisma.studioProject.update({
        data: input,
        include: { samples: { select: { id: true } } },
        where: { id },
      });

      return formatProject(updatedProject);
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.prisma.studioProject.delete({ where: { id } });
    } catch (error: unknown) {
      throw mapError(error, 'Project');
    }
  }
}

export const projectRepository = new ProjectRepository(prisma);
