import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
