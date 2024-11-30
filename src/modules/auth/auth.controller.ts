import { Controller } from '@nestjs/common';
import { Body, HttpCode, Post, Req } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: SignUpDto })
  async signUp(@Req() req: Request, @Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  async signIn(@Req() req: Request, @Body() signInDto: SignInDto) {
    console.log(signInDto);
  }
}
