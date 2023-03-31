import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import configEmail from './config/email';
import path from 'path';
import { AddressModule } from './address/address.module';
import { BookModule } from './book/book.module';
import { CardModule } from './card/card.module';
import { CartModule } from './cart/cart.module';
import { CartDetailModule } from './cart_detail/cart_detail.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { ServiceExceptionToHttpExceptionFilter } from './entity';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configEmail] }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('===== write [.env] by config: network =====');
        console.log(config.get('email'));
        return {
          ...config.get('email'),
          template: {
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    AddressModule,
    BookModule,
    CardModule,
    CartModule,
    CartDetailModule,
    OrderModule,
    OrderDetailModule,
    UserModule,
    DbModule,
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
