import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserWhereUniqueInput,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserOrderByWithRelationInput,
  Prisma.UserSelect
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'User');
  }
}
