import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { pickFields } from 'src/utils';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: Request) {
    return this.userService.findUser(
      {
        email: req.user.email,
      },
      pickFields<User>(['name', 'email']),
    );
  }

  @Put('profile/update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
    return this.userService.updateUserProfile(req.user.email, body);
  }

  @Put('profile/inactive')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async inactiveProfile(@Req() req: Request) {
    return this.userService.inactiveUser(req.user.email);
  }

  @Put('profile/active')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async activeProfile(@Req() req: Request) {
    return this.userService.activeUser(req.user.email);
  }
}
