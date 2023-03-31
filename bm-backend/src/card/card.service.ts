import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Card } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  /**
   * 카드 정보 생성
   * --
   * @param cardInfo
   * @returns
   */
  async createCard(cardInfo: CreateCardDto) {
    try {
      if (cardInfo.card_id) {
        const { card_id } = cardInfo;
        const check = await this.cardRepository.findOne({
          where: { card_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }
      const test = this.cardRepository.create(cardInfo);
      const result = await this.cardRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카드 전체 목록 조회
   * --
   * @returns
   */
  async getCardList() {
    try {
      const result = await this.cardRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카드 상세 정보 조회
   * @param card_id
   * @returns
   */
  async getCardInfo(card_id: string) {
    try {
      const card = await this.cardRepository.findOneOrFail({
        where: { card_id },
      });
      return card;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카드 정보 수정
   * --
   * @param cardInfo
   * @returns
   */
  async updateCard(cardInfo: UpdateCardDto) {
    try {
      const { card_id, ...updateInfo } = cardInfo;

      const result = await this.cardRepository.update({ card_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 카드 정보 삭제
   * --
   * @param card_id
   * @returns
   */
  async deleteCard(card_id: string) {
    try {
      await this.cardRepository.findOneOrFail({ where: { card_id } });

      const result = await this.cardRepository.delete({ card_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
