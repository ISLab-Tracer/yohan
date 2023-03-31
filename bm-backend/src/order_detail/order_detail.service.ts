import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { OrderDetail } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from './dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  /**
   * 주문 상세 정보 생성
   * --
   * @param orderDetailInfo
   * @returns
   */
  async createOrderDetail(orderDetailInfo: CreateOrderDetailDto) {
    try {
      const { book_id, order_id } = orderDetailInfo;
      if (book_id && order_id) {
        const check = await this.orderDetailRepository.findOne({
          where: { book_id, order_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.orderDetailRepository.create(orderDetailInfo);
      const result = await this.orderDetailRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 상세 전체 목록 조회
   * --
   * @returns
   */
  async getOrderDetailList() {
    try {
      const result = await this.orderDetailRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 상세 정보 조회
   * @param order_id
   * @returns
   */
  async getOrderDetailInfo(book_id: number, order_id: number) {
    try {
      const orderDetail = await this.orderDetailRepository.findOneOrFail({
        where: { book_id, order_id },
      });
      return orderDetail;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 상세 정보 수정
   * --
   * @param orderDetailInfo
   * @returns
   */
  async updateOrderDetail(orderDetailInfo: UpdateOrderDetailDto) {
    try {
      const { book_id, order_id, ...updateInfo } = orderDetailInfo;

      const result = await this.orderDetailRepository.update(
        { book_id, order_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 상세 정보 삭제
   * --
   * @param order_id
   * @returns
   */
  async deleteOrderDetail(book_id: number, order_id: number) {
    try {
      const orderDetail = await this.orderDetailRepository.findOneOrFail({
        where: { book_id, order_id },
      });
      const result = await this.orderDetailRepository.delete(orderDetail);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
