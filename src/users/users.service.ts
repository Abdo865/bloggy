import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { encode } from 'src/utils/bcrypt';
// import * as  from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUsers() {
    return await this.prismaService.user.findMany({});
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({ where: { username } });
  }

  async updateUser(updatedUser: CreateUserDto) {
    const name = this.makeName(updatedUser.fname, updatedUser.lname);
    return await this.prismaService.user.update({
      where: { username: updatedUser.username },
      data: {
        name: name,
        email: updatedUser.email,
        password: await encode(updatedUser.password),
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const name = this.makeName(createUserDto.fname, createUserDto.lname);
    const password = await encode(createUserDto.password);
    const user = {
      email: createUserDto.email,
      username: createUserDto.username,
      password,
      name,
    };
    return await this.prismaService.user.create({ data: { ...user } });
  }

  private makeName(fname: string, lname: string): string {
    return fname.trim() + ' ' + lname.trim();
  }
}
