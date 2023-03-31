import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Book } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  /**
   * 도서 정보 생성
   * --
   * @param bookInfo
   * @returns
   */
  async createBook(bookInfo: CreateBookDto) {
    try {
      if (bookInfo.book_id) {
        const { book_id } = bookInfo;
        const check = await this.bookRepository.findOne({
          where: { book_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.bookRepository.create(bookInfo);
      const result = await this.bookRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 도서 전체 목록 조회
   * --
   * @returns
   */
  async getBookList() {
    try {
      const result = await this.bookRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 도서 상세 정보 조회
   * @param book_id
   * @returns
   */
  async getBookInfo(book_id: number) {
    try {
      const book = await this.bookRepository.findOneOrFail({
        where: { book_id },
      });
      return book;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 도서 정보 수정
   * --
   * @param bookInfo
   * @returns
   */
  async updateBook(bookInfo: UpdateBookDto) {
    try {
      const { book_id, ...updateInfo } = bookInfo;

      const result = await this.bookRepository.update({ book_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 도서 정보 삭제
   * --
   * @param book_id
   * @returns
   */
  async deleteBook(book_id: number) {
    try {
      await this.bookRepository.findOneOrFail({ where: { book_id } });

      const result = await this.bookRepository.delete({ book_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
