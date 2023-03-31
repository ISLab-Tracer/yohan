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
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('/')
  async createAddress(
    @Res() res: Response,
    @Body() addressInfo: CreateAddressDto,
  ) {
    try {
      const result = await this.addressService.createAddress(addressInfo);
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
  async getAddressList(@Res() res: Response) {
    try {
      const result = await this.addressService.getAddressList();
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

  @Get('/:address_id')
  async getAddressInfo(
    @Res() res: Response,
    @Param('address_id') address_id: string,
  ) {
    try {
      const result = await this.addressService.getAddressInfo(address_id);
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
  async updateAddress(
    @Res() res: Response,
    @Body() addressInfo: UpdateAddressDto,
  ) {
    try {
      const result = await this.addressService.updateAddress(addressInfo);
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

  @Delete('/:address_id')
  async deleteUser(
    @Res() res: Response,
    @Param('address_id') address_id: string,
  ) {
    try {
      const result = await this.addressService.deleteAddress(address_id);
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
