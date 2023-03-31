import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 회원 정보 생성
   * --
   * @param userInfo
   * @returns
   */
  async createUser(userInfo: CreateUserDto) {
    try {
      if (userInfo.user_id) {
        const { user_id } = userInfo;
        const check = await this.userRepository.findOne({
          where: { user_id: user_id },
        });
        if (check) {
          throw EntityBadRequestException();
        }
      }

      const test = this.userRepository.create(userInfo);
      const result = await this.userRepository.save(test);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 전체 목록 조회
   * --
   * @returns
   */
  async getUserList() {
    try {
      const result = await this.userRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 상세 정보 조회
   * @param user_id
   * @returns
   */
  async getUserInfo(user_id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { user_id: user_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 수정
   * --
   * @param userInfo
   * @returns
   */
  async updateUser(userInfo: UpdateUserDto) {
    try {
      const { user_id, ...updateInfo } = userInfo;

      const result = await this.userRepository.update({ user_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 회원 정보 삭제
   * --
   * @param user_id
   * @returns
   */
  async deleteUser(user_id: string) {
    try {
      await this.userRepository.findOneOrFail({ where: { user_id } });

      const result = await this.userRepository.delete({ user_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
