import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @MinLength(3)
  @IsNotEmpty()
  fname: string;

  @MinLength(3)
  @IsNotEmpty()
  lname: string;
}
