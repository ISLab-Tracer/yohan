import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @IsString()
  @IsOptional()
  user_nm?: string;

  @IsString()
  @IsOptional()
  user_pw?: string;

  @IsString()
  @IsOptional()
  user_grade?: string;
}
