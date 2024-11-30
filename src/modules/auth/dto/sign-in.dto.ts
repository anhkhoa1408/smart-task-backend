import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email must be a string and in valid email format',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail(undefined, {
    message: 'Email must have valid format',
  })
  email: string;

  @ApiProperty({
    description: 'Password must be a string and at least 6 characters long',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(6, {
    message: 'Password must have at least 6 characters long',
  })
  password: string;
}
