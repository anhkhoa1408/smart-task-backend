import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { Prisma, Project } from '@prisma/client';
import { PaginationParams } from 'src/types/pagination.type';
import { isUUID } from 'class-validator';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getListProjects(
    userId: string,
    params: PaginationParams,
  ): Promise<Project[]> {
    const { skip = 0, limit = 10 } = params;
    return this.projectRepository.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });
  }

  async getProjectById(
    userId: string,
    projectId: string,
  ): Promise<Project | null> {
    if (!isUUID(projectId)) {
      throw new BadRequestException('Invalid project ID');
    }

    const foundProject = await this.projectRepository.findUnique({
      id: projectId,
      userId: userId,
    });

    if (!foundProject) {
      throw new BadRequestException(
        `Project with ID ${projectId} not found for user ${userId}`,
      );
    }

    return foundProject;
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectRepository.create(data);
  }
}
