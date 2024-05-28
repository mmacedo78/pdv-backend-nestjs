import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    /**
     * User current password
     * @example "abc123456"
     */
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    currentPassword?: string;

}
