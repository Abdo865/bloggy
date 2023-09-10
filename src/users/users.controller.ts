import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from './serialized-types/serialized-user';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    return (await this.usersService.getUsers()).map(
      (user) => new SerializedUser(user),
    );
  }

  @Get('id/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(@Param('id') id: string) {
    return new SerializedUser(await this.usersService.getUserById(id));
  }

  @Get('username/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserByUsername(@Param('username') username: string) {
    return new SerializedUser(
      await this.usersService.getUserByUsername(username),
    );
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new SerializedUser(
      await this.usersService.createUser(createUserDto),
    );
  }

  @Post('update')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUser(@Body() createUserDto: CreateUserDto) {
    return new SerializedUser(
      await this.usersService.updateUser(createUserDto),
    );
  }
}
