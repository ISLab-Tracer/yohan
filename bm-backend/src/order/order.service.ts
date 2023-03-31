import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Order } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  /**
   * 주문 정보 생성
   * --
   * @param orderInfo
   * @returns
   */
  async createOrder(orderInfo: CreateOrderDto) {
    try {
      if (orderInfo.order_id) {
        const { order_id } = orderInfo;
        const check = await this.orderRepository.findOne({
          where: { order_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.orderRepository.create(orderInfo);
      const result = await this.orderRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 전체 목록 조회
   * --
   * @returns
   */
  async getOrderList() {
    try {
      const result = await this.orderRepository.find();
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
  async getOrderInfo(order_id: number) {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: { order_id },
      });
      return order;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 정보 수정
   * --
   * @param orderInfo
   * @returns
   */
  async updateOrder(orderInfo: UpdateOrderDto) {
    try {
      const { order_id, ...updateInfo } = orderInfo;

      const result = await this.orderRepository.update(
        { order_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주문 정보 삭제
   * --
   * @param order_id
   * @returns
   */
  async deleteOrder(order_id: number) {
    try {
      await this.orderRepository.findOneOrFail({ where: { order_id } });

      const result = await this.orderRepository.delete({ order_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
