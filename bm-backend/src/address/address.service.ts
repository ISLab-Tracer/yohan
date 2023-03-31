import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { Address } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  /**
   * 주소 정보 생성
   * --
   * @param addressInfo
   * @returns
   */
  async createAddress(addressInfo: CreateAddressDto) {
    try {
      if (addressInfo.address_id) {
        const { address_id } = addressInfo;
        const check = await this.addressRepository.findOne({
          where: { address_id: address_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const test = this.addressRepository.create(addressInfo);
      const result = await this.addressRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주소 전체 목록 조회
   * --
   * @returns
   */
  async getAddressList() {
    try {
      const result = await this.addressRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주소 상세 정보 조회
   * @param address_id
   * @returns
   */
  async getAddressInfo(address_id: string) {
    try {
      const address = await this.addressRepository.findOneOrFail({
        where: { address_id: address_id },
      });
      return address;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주소 정보 수정
   * --
   * @param addressInfo
   * @returns
   */
  async updateAddress(addressInfo: UpdateAddressDto) {
    try {
      const { address_id, ...updateInfo } = addressInfo;

      const result = await this.addressRepository.update(
        { address_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 주소 정보 삭제
   * --
   * @param address_id
   * @returns
   */
  async deleteAddress(address_id: string) {
    try {
      await this.addressRepository.findOneOrFail({ where: { address_id } });

      const result = await this.addressRepository.delete({ address_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
