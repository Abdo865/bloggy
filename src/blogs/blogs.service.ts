import { Injectable } from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { PrismaService } from 'src/utils/prisma.service';
import { Blog } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBlogs(): Promise<Blog[]> {
    const allBlogs = await this.prismaService.blog.findMany();

    return allBlogs;
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.prismaService.blog.findFirstOrThrow({
      where: { id },
    });

    return blog;
  }

  async getBlogsByTitle(title: string): Promise<Blog[]> {
    const blogs = await this.prismaService.blog.findMany({
      where: { title: { contains: title } },
    });

    return blogs;
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = await this.prismaService.blog.create({
      data: createBlogDto,
    });

    return createdBlog;
  }

  async updateBlog(updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.prismaService.blog.update({
      where: { id: updateBlogDto.blogId },
      data: { title: updateBlogDto.title, content: updateBlogDto.content },
    });

    return updatedBlog;
  }

  async deleteBlog(id: string) {
    const deletedBlog = await this.prismaService.blog.delete({ where: { id } });

    return deletedBlog;
  }
}
