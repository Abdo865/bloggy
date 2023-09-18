import { Blog } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedBlog {
  title: string;
  content: string;

  @Exclude()
  id: string;

  @Exclude()
  authorId: string;

  constructor(partial: Partial<Blog>) {
    Object.assign(this, partial);
  }
}
