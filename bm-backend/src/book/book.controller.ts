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
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('/')
  async createBook(@Res() res: Response, @Body() bookInfo: CreateBookDto) {
    try {
      const result = await this.bookService.createBook(bookInfo);
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
  async getBookList(@Res() res: Response) {
    try {
      const result = await this.bookService.getBookList();
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

  @Get('/:book_id')
  async getBookInfo(@Res() res: Response, @Param('book_id') book_id: number) {
    try {
      const result = await this.bookService.getBookInfo(book_id);
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
  async updateBook(@Res() res: Response, @Body() bookInfo: UpdateBookDto) {
    try {
      const result = await this.bookService.updateBook(bookInfo);
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

  @Delete('/:book_id')
  async deleteUser(@Res() res: Response, @Param('book_id') book_id: number) {
    try {
      const result = await this.bookService.deleteBook(book_id);
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
