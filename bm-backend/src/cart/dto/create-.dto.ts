import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
