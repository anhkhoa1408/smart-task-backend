import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { pickFields } from 'src/utils';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInDto) {
    const { email, password } = body;
    const user = await this.userService.findUser(
      {
        email,
        isActive: true,
      },
      pickFields<User>(['id', 'name', 'email', 'password']),
    );

    if (!user) {
      throw new BadRequestException('User is not registered');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      email: user.email,
      name: user.name,
    };
  }

  async signUp(body: SignUpDto) {
    const { name, email, password } = body;
    const user = await this.userService.findUser(
      {
        email: email,
      },
      pickFields<User>(['id', 'name', 'email', 'isActive']),
    );

    if (user) {
      if (user?.isActive) {
        throw new BadRequestException('User is registered');
      } else {
        await this.userService.activeUser(email);
        return {
          accessToken: this.jwtService.sign({
            id: user.id,
            name,
            email,
          }),
          name,
          email,
        };
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userService.createUser(
      {
        name,
        email,
        password: hashPassword,
      },
      pickFields<User>(['name', 'email']),
    );

    return {
      accessToken: this.jwtService.sign({
        id: createdUser.id,
        name,
        email,
      }),
      ...createdUser,
    };
  }
}
