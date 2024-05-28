import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

  /**
   * User email
   * @example "user@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * User password must contain at least 1 number and 1 letter
   * @example "abc123456"
   */
  @IsString()
  @MinLength(8, { message: 'Password must have length of at least 8' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 number and 1 letter',
  })
  password: string;

  /**
   * User name
   * @example "John Doe"
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * User address
   * @example "World Street 0"
   */
  @IsString()
  @IsOptional()
  address?: string;

}