import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from './dto';
import { OrderDetailService } from './order_detail.service';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}

  @Post('/')
  async createOrderDetail(
    @Res() res: Response,
    @Body() orderDetailInfo: CreateOrderDetailDto,
  ) {
    try {
      const result = await this.orderDetailService.createOrderDetail(
        orderDetailInfo,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Get('/')
  async getOrderDetailList(@Res() res: Response) {
    try {
      const result = await this.orderDetailService.getOrderDetailList();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Get('/info/:book_id/:order_id')
  async getOrderDetailInfo(
    @Res() res: Response,
    @Param('book_id') book_id: number,
    @Param('order_id') order_id: number,
  ) {
    try {
      const result = await this.orderDetailService.getOrderDetailInfo(
        book_id,
        order_id,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Put()
  async updateOrderDetail(
    @Res() res: Response,
    @Body() orderDetailInfo: UpdateOrderDetailDto,
  ) {
    try {
      const result = await this.orderDetailService.updateOrderDetail(
        orderDetailInfo,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Delete('/:book_id/:order_id')
  async deleteUser(
    @Res() res: Response,
    @Param('book_id') book_id: number,
    @Param('order_id') order_id: number,
  ) {
    try {
      const result = await this.orderDetailService.deleteOrderDetail(
        book_id,
        order_id,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
