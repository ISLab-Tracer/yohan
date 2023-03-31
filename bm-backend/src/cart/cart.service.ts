import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Cart } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateCartDto, UpdateCartDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  /**
   * 장바구니 정보 생성
   * --
   * @param cartInfo
   * @returns
   */
  async createCart(cartInfo: CreateCartDto) {
    try {
      if (cartInfo.cart_id) {
        const { cart_id } = cartInfo;
        const check = await this.cartRepository.findOne({
          where: { cart_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.cartRepository.create(cartInfo);
      const result = await this.cartRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 전체 목록 조회
   * --
   * @returns
   */
  async getCartList() {
    try {
      const result = await this.cartRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 상세 정보 조회
   * @param cart_id
   * @returns
   */
  async getCartInfo(cart_id: number) {
    try {
      const cart = await this.cartRepository.findOneOrFail({
        where: { cart_id },
      });
      return cart;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 정보 수정
   * --
   * @param cartInfo
   * @returns
   */
  async updateCart(cartInfo: UpdateCartDto) {
    try {
      const { cart_id, ...updateInfo } = cartInfo;

      const result = await this.cartRepository.update({ cart_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 장바구니 정보 삭제
   * --
   * @param cart_id
   * @returns
   */
  async deleteCart(cart_id: number) {
    try {
      await this.cartRepository.findOneOrFail({ where: { cart_id } });

      const result = await this.cartRepository.delete({ cart_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
