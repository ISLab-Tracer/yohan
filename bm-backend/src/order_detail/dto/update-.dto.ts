import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @IsNumber()
  @IsOptional()
  order_qty: number;
}
