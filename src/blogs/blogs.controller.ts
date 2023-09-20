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
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { GetUser } from 'src/utils/custome-decorators';

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
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req,
    @GetUser('userId') userId,
  ) {
    createBlogDto.authorId = userId;
    return new SerializedBlog(await this.blogService.createBlog(createBlogDto));
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    updateBlogDto.blogId = id;
    return this.blogService.updateBlog(updateBlogDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.blogService.deleteBlog(id);
  }
}
