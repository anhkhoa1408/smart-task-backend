import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { PaginationParams } from 'src/types/pagination.type';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getListProjects(
    @Req() req: Request,
    @Param() params: PaginationParams,
  ) {
    return this.projectService.getListProjects(req.user.id, params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Req() req: Request, @Param('id') projectId: string) {
    return this.projectService.getProjectById(req.user.id, projectId);
  }
}
