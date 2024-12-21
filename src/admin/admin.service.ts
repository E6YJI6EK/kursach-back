import {Injectable} from '@nestjs/common';
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {UpdateUserDto} from "./dto/update-user.dto";
import {OrganizationEntity} from "../organization/entities/organization.entity";
import {FilialEntity} from "../organization/entities/filial.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
      private jwtService: JwtService,
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      @InjectRepository(OrganizationEntity)
      private organizationsRepository: Repository<OrganizationEntity>,
      @InjectRepository(FilialEntity)
      private filialRepository: Repository<FilialEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, role, lastName, firstName, filialId, organizationId } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { userName: username } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const organization = await this.organizationsRepository.findOne({where: {org_id: organizationId}});
    if (!organization) {
      throw new Error('Organization not exists');
    }

    const filial = await this.filialRepository.findOne({where: {filial_id: filialId}});
    if (!filial) {
      throw new Error('Filial not exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      userName: username,
      password: hashedPassword,
      role: role,
      last_name: lastName,
      first_name: firstName,
      filial: filial,
       organization: organization
    });

    return await this.usersRepository.save(newUser);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { user_id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { user_id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.remove(user);
  }

  async getAllUsers(token: string) {
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = this.jwtService.decode(token).userResult;
    const users = await this.usersRepository.find({relations: ['organization', 'filial'] });
    return users.filter(user => user.user_id !== decoded.userId)
  }

  async getAllOrgs(token: string) {
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = this.jwtService.decode(token).userResult;
    const organization = await this.organizationsRepository.findOne({where: {org_id: decoded.organizationId}, relations:['filials']});
    return organization.filials;
  }
}
