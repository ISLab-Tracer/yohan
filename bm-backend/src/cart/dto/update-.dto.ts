import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
