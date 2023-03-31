import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDetailDto {
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
