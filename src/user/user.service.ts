import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import {Repository} from 'typeorm';
import {UserEntity} from "./entities/user.entity";
import {LoginUserDto} from "../auth/dto/login.dto";
import {LoginResponseDto} from "../auth/dto/login-response.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_id: id } });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(loginDto: LoginUserDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { userName: username  }, relations: ['organization', 'filial']});

    if (user && user.validatePassword(password)) {
      const userResponse = new LoginResponseDto();
      userResponse.userId = user.user_id;
      userResponse.username = user.userName;
      userResponse.organizationId = user.organization.org_id;
      userResponse.filialId = user.filial.filial_id;
      userResponse.firstName = user.first_name;
      userResponse.lastName = user.last_name;
      userResponse.patronymic = user.patronymic;
      userResponse.role = user.role;
      return userResponse;
    } else {
      return null;
    }
  }
}