import { Prisma, Project } from '@prisma/client';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepository extends BaseRepository<
  Project,
  Prisma.ProjectWhereUniqueInput,
  Prisma.ProjectWhereInput,
  Prisma.ProjectCreateInput,
  Prisma.ProjectUpdateInput,
  Prisma.ProjectOrderByWithRelationInput,
  Prisma.ProjectSelect
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Project');
  }
}
