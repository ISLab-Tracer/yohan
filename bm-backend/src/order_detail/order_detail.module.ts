import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, Order, OrderDetail } from 'src/entity';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Order, Book])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
