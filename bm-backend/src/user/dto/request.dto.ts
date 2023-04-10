import { IsNotEmpty, IsString } from 'class-validator';
export class RequestSigninDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
