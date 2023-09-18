import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: string;
  full_name: string;
  username: string;
  email: string;

  @Exclude()
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.full_name = partial.name;
  }
}
