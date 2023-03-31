import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, Cart, CartDetail } from 'src/entity';
import { CartDetailController } from './cart_detail.controller';
import { CartDetailService } from './cart_detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartDetail, Cart, Book])],
  controllers: [CartDetailController],
  providers: [CartDetailService],
})
export class CartDetailModule {}
