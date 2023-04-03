import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { CartDetail } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateCartDetailDto, UpdateCartDetailDto } from './dto';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
  ) {}

  /**
   * 장바구니 상세 정보 생성
   * --
   * @param cartDetailInfo
   * @returns
   */
  async createCartDetail(cartDetailInfo: CreateCartDetailDto) {
    try {
      const { cart_id, book_id } = cartDetailInfo;
      if (cart_id && book_id) {
        const check = await this.cartDetailRepository.findOne({
          where: { cart_id, book_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.cartDetailRepository.create(cartDetailInfo);
      const result = await this.cartDetailRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 상세 전체 목록 조회
   * --
   * @returns
   */
  async getCartDetailList() {
    try {
      const result = await this.cartDetailRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 상세 상세 정보 조회
   * @param cart_id
   * @returns
   */
  async getCartDetailInfo(cart_id: number) {
    try {
      const cartDetail = await this.cartDetailRepository.findOneOrFail({
        where: { cart_id },
      });
      return cartDetail;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 상세 정보 수정
   * --
   * @param cartDetailInfo
   * @returns
   */
  async updateCartDetail(cartDetailInfo: UpdateCartDetailDto) {
    try {
      const { cart_id, ...updateInfo } = cartDetailInfo;

      const result = await this.cartDetailRepository.update(
        { cart_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 상세 정보 삭제
   * --
   * @param cart_id
   * @returns
   */
  async deleteCartDetail(cart_id: number) {
    try {
      await this.cartDetailRepository.findOneOrFail({
        where: { cart_id },
      });

      const result = await this.cartDetailRepository.delete({ cart_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
