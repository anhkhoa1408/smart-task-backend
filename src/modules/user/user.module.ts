import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [PrismaService, UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
