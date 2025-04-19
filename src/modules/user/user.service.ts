import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/modules/user/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect | null,
  ): Promise<User | null> {
    return this.userRepository.findUnique(userWhereUniqueInput, select);
  }

  async createUser(
    data: Prisma.UserCreateInput,
    select?: Prisma.UserSelect | null,
  ): Promise<User> {
    return this.userRepository.create(data, select);
  }

  async updateUserProfile(email: string, body: UpdateUserDto) {
    const foundUser = await this.findUser({
      email,
    });

    if (!foundUser) throw new BadRequestException('User is not registered');

    return await this.userRepository.update({
      where: {
        email,
      },
      data: {
        name: body.name,
        phone: body.phone,
        gender: body.gender,
      },
    });
  }

  async activeUser(email: string) {
    const foundUser = await this.findUser({
      email,
    });

    if (!foundUser) throw new BadRequestException('User is not registered');

    return await this.userRepository.update({
      where: {
        email,
      },
      data: {
        isActive: true,
      },
    });
  }

  async inactiveUser(email: string) {
    const foundUser = await this.findUser({
      email,
    });

    if (!foundUser) throw new BadRequestException('User is not registered');

    return await this.userRepository.update({
      where: {
        email,
      },
      data: {
        isActive: false,
      },
    });
  }
}
