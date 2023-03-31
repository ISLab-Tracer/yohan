import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCartDetailDto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @IsNumber()
  @IsOptional()
  cart_qty: number;
}
