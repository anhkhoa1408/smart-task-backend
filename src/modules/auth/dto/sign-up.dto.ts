import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ description: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail(undefined, {
    message: 'Email must have valid format',
  })
  @ApiProperty({
    description: 'Email must be a string and in valid email format',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(6, {
    message: 'Password must have at least 6 characters long',
  })
  @ApiProperty({
    description: 'Password must be a string and at least 6 characters long',
  })
  password: string;
}
