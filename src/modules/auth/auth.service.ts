import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInDto) {
    const { email, password } = body;
    const user = await this.userService.findUser({
      email,
    });

    if (!user) {
      throw new BadRequestException('User is not registered');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    return {
      accessToken: this.jwtService.sign({
        email,
        name: user.name,
      }),
    };
  }

  async signUp(body: SignUpDto) {
    const { name, email, password } = body;
    const user = await this.userService.findUser({
      name,
      email,
    });

    if (user) {
      throw new BadRequestException('User is registered');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userService.createUser(
      {
        name,
        email,
        password: hashPassword,
      },
      {
        name: true,
        email: true,
      },
    );

    return {
      accessToken: this.jwtService.sign({
        name,
        email,
      }),
      ...createdUser,
    };
  }
}
