import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Емейл пользователя',
    default: '',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(4, {
    message:
      'Login is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(15, {
    message:
      'Login is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  @ApiProperty({
    description: 'Имя пользователя',
    default: '',
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Пароль',
    default: '',
  })
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Емейл пользователя',
    default: '',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Пароль',
    default: '',
  })
  password: string;
}
