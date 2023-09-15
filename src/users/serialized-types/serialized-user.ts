import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUser {
  full_name: string;
  username: string;
  email: string;

  @Exclude()
  id: string;

  @Exclude()
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.full_name = partial.name;
  }
}
