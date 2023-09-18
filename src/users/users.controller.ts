import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SerializedUser } from './serialized-types/serialized-user';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return (await this.usersService.getUsers()).map(
      (user) => new SerializedUser(user),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return new SerializedUser(user);
  }

  @Get('username/:username')
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param('username') username: string) {
    return new SerializedUser(
      await this.usersService.getUserByUsername(username),
    );
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new SerializedUser(
      await this.usersService.createUser(createUserDto),
    );
  }

  @Post('update')
  async updateUser(@Body() createUserDto: CreateUserDto) {
    return new SerializedUser(
      await this.usersService.updateUser(createUserDto),
    );
  }
}
