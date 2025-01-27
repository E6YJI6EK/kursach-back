import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { OrganizationEntity } from "../organization/entities/organization.entity";
import { FilialEntity } from "../organization/entities/filial.entity";
import { PatientEntity } from "./entities/patient.entity";
import { DocumentEntity } from "../files/entities/document.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { MedregistratorEntity } from "./entities/medregistrator.entity";
import { DoctorSpecializationsEntity } from "./entities/doctor-specializations.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrganizationEntity,
      FilialEntity,
      PatientEntity,
      DocumentEntity,
      DoctorEntity,
      MedregistratorEntity,
      DoctorSpecializationsEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
