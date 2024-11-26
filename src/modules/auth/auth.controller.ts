import { Controller } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, HttpCode, Post, Req } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  // @ApiCreatedResponse({ type: Billboard })
  async signIn(@Req() req: Request, @Body() signInDto: SignInDto) {
    console.log(signInDto);
  }
}
