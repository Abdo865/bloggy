import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SerializedBlog } from './serialized-types/serialized-blog';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  async getBlogs() {
    return (await this.blogService.getBlogs()).map(
      (blog) => new SerializedBlog(blog),
    );
  }

  @Get('id/:id')
  async getBlogById(@Param('id') id: string) {
    return new SerializedBlog(await this.blogService.getBlogById(id));
  }

  @Get('title/:title')
  async getBlogsByTitle(@Param('title') title: string) {
    return (await this.blogService.getBlogsByTitle(title)).map(
      (blog) => new SerializedBlog(blog),
    );
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createBlog(@Body() blogDto: BlogDto, @Req() req) {
    const userId = req.user.userId;
    blogDto.authorId = userId;
    return new SerializedBlog(await this.blogService.createBlog(blogDto));
  }

  @Put('update')
  async update(@Body() blogDto: BlogDto) {
    this.blogService.update(blogDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    await this.delete(id);
  }
}
