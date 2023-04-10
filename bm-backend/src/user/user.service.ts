import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityBadRequestException } from 'src/config/service.exception';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RequestSigninDto } from './dto/request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
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
        where: { user_id },
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

  /**
   * 토큰 생성
   * --
   * @param id
   * @param type
   * @returns
   */
  async generateToken(
    id: string,
    type: string = 'ADMIN',
  ): Promise<{ access_token: string }> {
    const payload = {
      id: id,
      type: type,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '14d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  /**
   * 토큰 인증
   * --
   * @param authorization
   * @returns
   */
  async verify(authorization: string) {
    try {
      const token = authorization.replace('Bearer ', '');
      const secret = this.config.get('JWT_SECRET');
      const result = await this.jwt.verifyAsync(token, {
        secret,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 로그인 요청
   * --
   * @param userInfo
   */
  async requestSignin(signin: RequestSigninDto) {
    try {
      const { user_id } = signin;
      const user = await this.userRepository.findOneOrFail({
        where: { user_id },
      });

      const access_token = await this.generateToken(user.user_id, 'NORMAL');
      const login_data = {
        ...user,
        ...access_token,
      };
      return login_data;
    } catch (e) {
      throw e;
    }
  }
}
