import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dto/create-user.dto';

@ApiTags('user entity')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUser() {
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.userService.addUser(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  loginUser(@Body() user: LoginUserDto) {
    return this.userService.loginUser(user);
  }
}
