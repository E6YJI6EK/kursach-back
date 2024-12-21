import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../admin/dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class MedregistratorService {
  constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
  ) {}
  async createPatient(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { userName: username } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      userName: username,
      password: hashedPassword,
      role: role,
    });

    return await this.usersRepository.save(newUser);
  }
}
