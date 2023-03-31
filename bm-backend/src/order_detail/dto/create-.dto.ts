import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDetailDto {
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
