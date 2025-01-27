import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OrganizationEntity } from "../organization/entities/organization.entity";
import { FilialEntity } from "../organization/entities/filial.entity";
import { JwtService } from "@nestjs/jwt";
import { MedicalServicesEntity } from "../medical-services/entities/medical-services.entity";
import { DoctorSpecializationsEntity } from "../user/entities/doctor-specializations.entity";
import { DoctorEntity } from "../user/entities/doctor.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrganizationEntity,
      FilialEntity,
      MedicalServicesEntity,
      DoctorSpecializationsEntity,
      DoctorEntity,
    ]),
  ],
  providers: [AdminService, JwtService],
  controllers: [AdminController],
})
export class AdminModule {}
