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
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dto';
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('/')
  async createCard(@Res() res: Response, @Body() cardInfo: CreateCardDto) {
    try {
      const result = await this.cardService.createCard(cardInfo);
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
  async getCardList(@Res() res: Response) {
    try {
      const result = await this.cardService.getCardList();
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

  @Get('/:card_id')
  async getCardInfo(@Res() res: Response, @Param('card_id') card_id: string) {
    try {
      const result = await this.cardService.getCardInfo(card_id);
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
  async updateCard(@Res() res: Response, @Body() cardInfo: UpdateCardDto) {
    try {
      const result = await this.cardService.updateCard(cardInfo);
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

  @Delete('/:card_id')
  async deleteUser(@Res() res: Response, @Param('card_id') card_id: string) {
    try {
      const result = await this.cardService.deleteCard(card_id);
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
