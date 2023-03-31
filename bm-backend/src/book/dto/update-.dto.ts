import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  book_id: number;

  @IsString()
  @IsOptional()
  book_title: string;

  @IsNumber()
  @IsOptional()
  book_qty: number;

  @IsNumber()
  @IsOptional()
  book_price: number;

  @IsString()
  @IsOptional()
  book_desc: string;

  @IsString()
  @IsOptional()
  book_img: string;

  @IsString()
  @IsOptional()
  book_col: string;
}
