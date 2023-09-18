import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  providers: [BlogsService, PrismaService],
  controllers: [BlogsController],
})
export class BlogsModule {}
