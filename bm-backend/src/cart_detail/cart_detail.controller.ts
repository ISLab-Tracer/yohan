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
import { CartDetailService } from './cart_detail.service';
import { CreateCartDetailDto, UpdateCartDetailDto } from './dto';

@Controller('cart-detail')
export class CartDetailController {
  constructor(private cartDetailService: CartDetailService) {}

  @Post('/')
  async createCartDetail(
    @Res() res: Response,
    @Body() cartDetailInfo: CreateCartDetailDto,
  ) {
    try {
      const result = await this.cartDetailService.createCartDetail(
        cartDetailInfo,
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
  async getCartList(@Res() res: Response) {
    try {
      const result = await this.cartDetailService.getCartDetailList();
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

  @Get('/:cart_id')
  async getCartInfo(@Res() res: Response, @Param('cart_id') cart_id: number) {
    try {
      const result = await this.cartDetailService.getCartDetailInfo(cart_id);
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
  async updateCartDetail(
    @Res() res: Response,
    @Body() cartInfo: UpdateCartDetailDto,
  ) {
    try {
      const result = await this.cartDetailService.updateCartDetail(cartInfo);
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

  @Delete('/:cart_id')
  async deleteCartDetail(
    @Res() res: Response,
    @Param('cart_id') cart_id: number,
  ) {
    try {
      const result = await this.cartDetailService.deleteCartDetail(cart_id);
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
