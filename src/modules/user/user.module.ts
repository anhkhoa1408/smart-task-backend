import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRepository } from 'src/common/repositories/user.repository';

@Module({
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
