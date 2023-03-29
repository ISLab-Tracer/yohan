import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from './basket/basket.module';
import { BasketinfoModule } from './basketinfo/basketinfo.module';
import { BookModule } from './book/book.module';
import { CreditcardModule } from './creditcard/creditcard.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { OrderModule } from './order/order.module';
import { OrderinfoModule } from './orderinfo/orderinfo.module';
import { ShippingaddressModule } from './shippingaddress/shippingaddress.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceExceptionToHttpExceptionFilter } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    CustomerModule,
    CreditcardModule,
    OrderModule,
    OrderinfoModule,
    BookModule,
    BasketModule,
    ShippingaddressModule,
    BasketinfoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceExceptionToHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
