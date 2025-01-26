import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {OrganizationEntity} from "../organization/entities/organization.entity";
import {JwtService} from "@nestjs/jwt";
import {FilialEntity} from "../organization/entities/filial.entity";

@Injectable()
export class AdminService {
  constructor(
      private jwtService: JwtService,
      @InjectRepository(OrganizationEntity)
      private organizationsRepository: Repository<OrganizationEntity>,
      @InjectRepository(FilialEntity)
      private fililalsRepository: Repository<FilialEntity>,
  ) {}


  async getAllFilials(token: string) {
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = this.jwtService.decode(token).userResult;
    const organization = await this.organizationsRepository.findOne({where: {org_id: decoded.organizationId}, relations:['filials']});
    return organization.filials;
  }
}
