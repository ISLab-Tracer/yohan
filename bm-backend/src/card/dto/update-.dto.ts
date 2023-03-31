import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  card_id: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  card_date: string;

  @IsString()
  @IsOptional()
  card_kind: string;
}
