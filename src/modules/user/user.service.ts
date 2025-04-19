import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect | null,
  ): Promise<User | null> {
    return this.userRepository.findUnique(userWhereUniqueInput, select);
  }

  async findUsers(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
    select?: Prisma.UserSelect | null,
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userRepository.findMany(
      {
        skip,
        take,
        cursor,
        where,
        orderBy,
      },
      select,
    );
  }

  async createUser(
    data: Prisma.UserCreateInput,
    select?: Prisma.UserSelect | null,
  ): Promise<User> {
    return this.userRepository.create(data, select);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.userRepository.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.userRepository.delete(where);
  }
}
