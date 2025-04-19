import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { EGender } from '../enum/user.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Name must be a string',
  })
  @ApiProperty({
    description: "User's name",
  })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsPhoneNumber('VN', {
    message: 'Invalid phone number',
  })
  @ApiProperty({
    description: "User's phone number",
  })
  phone?: string;

  @IsOptional()
  @IsEnum(EGender, {
    message: 'Invalid gender',
  })
  @ApiProperty({
    description: "User's gender",
  })
  gender?: EGender;
}
