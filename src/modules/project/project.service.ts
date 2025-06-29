import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { pickFields } from 'src/utils';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectRepository } from './repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProjects(userId: string, params: PaginationDto): Promise<Project[]> {
    const { page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    return this.projectRepository.findMany({
      where: {
        userId: userId,
        isArchive: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
      select: this.projectSelectFields(),
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
      where: {
        id: projectId,
        userId: userId,
        isArchive: false,
      },
      select: this.projectSelectFields(),
    });

    if (!foundProject) {
      throw new BadRequestException(
        `Project with ID ${projectId} not found for user ${userId}`,
      );
    }

    return foundProject;
  }

  async createProject(
    userId: string,
    data: CreateProjectDto,
  ): Promise<Project> {
    const projectData: Prisma.ProjectCreateInput = {
      ...data,
      user: {
        connect: { id: userId },
      },
    };
    return this.projectRepository.create(projectData);
  }

  async deleteProject(projectId: string): Promise<void> {
    if (!isUUID(projectId)) {
      throw new BadRequestException('Invalid project ID');
    }

    const project = await this.projectRepository.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found `);
    }

    await this.projectRepository.delete({
      id: projectId,
    });
  }

  async archiveProject(projectId: string): Promise<Project> {
    if (!isUUID(projectId)) {
      throw new BadRequestException('Invalid project ID');
    }

    const project = await this.projectRepository.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found `);
    }

    return this.projectRepository.update({
      where: { id: projectId },
      data: { isArchive: true },
    });
  }

  private projectSelectFields = () =>
    pickFields<Project>([
      'id',
      'title',
      'description',
      'createdAt',
      'updatedAt',
    ]);
}
