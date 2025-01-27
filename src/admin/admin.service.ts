import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationEntity } from "../organization/entities/organization.entity";
import { JwtService } from "@nestjs/jwt";
import { FilialEntity } from "../organization/entities/filial.entity";
import { MedicalServicesEntity } from "../medical-services/entities/medical-services.entity";
import { DoctorSpecializationsEntity } from "../user/entities/doctor-specializations.entity";
import { UserEntity } from "../user/entities/user.entity";
import { DoctorEntity } from "../user/entities/doctor.entity";
import { Role } from "../user/enums/roles.enum";

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(OrganizationEntity)
    private organizationsRepository: Repository<OrganizationEntity>,
    @InjectRepository(FilialEntity)
    private fililalsRepository: Repository<FilialEntity>,
    @InjectRepository(MedicalServicesEntity)
    private medicalServicesRepository: Repository<MedicalServicesEntity>,
    @InjectRepository(DoctorSpecializationsEntity)
    private doctorSpecializationsRepository: Repository<DoctorSpecializationsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(DoctorSpecializationsEntity)
    private doctorSpecializatiionsRepository: Repository<DoctorSpecializationsEntity>,
  ) {}

  async getDoctorSpecs() {
    return await this.doctorSpecializationsRepository.find();
  }

  async getDoctors() {
    const docUsers = await this.userRepository.find({
      where: { role: Role.Doctor },
    });
    const doctors = await this.doctorRepository.find({
      relations: { user: true },
    });
    const specs = await this.doctorSpecializatiionsRepository.find({
      relations: { doctors: true },
    });
    return doctors.map((item) => ({
      ...item,
      specializations: specs.filter((spec) =>
        spec.doctors.some((d) => d.doctor_id === item.doctor_id),
      ),
    }));
  }

  async getAllFilials(token: string) {
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = this.jwtService.decode(token).userResult;
    const organization = await this.organizationsRepository.findOne({
      where: { org_id: decoded.organizationId },
      relations: ["filials"],
    });
    return organization.filials;
  }

  async getOrganizationInfo(id: number) {
    const org = await this.organizationsRepository.findOne({
      where: { org_id: id },
      relations: { filials: true },
    });
    const services = await this.medicalServicesRepository.find({
      relations: { organizations: true },
    });
    return {
      org,
      services: services.filter((item) =>
        item.organizations.some((o) => o.org_id === org.org_id),
      ),
    };
  }
}
