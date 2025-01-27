import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { OrganizationEntity } from "../organization/entities/organization.entity";
import { FilialEntity } from "../organization/entities/filial.entity";
import { PatientEntity } from "../user/entities/patient.entity";
import { DoctorEntity } from "../user/entities/doctor.entity";
import { DocumentEntity } from "../files/entities/document.entity";
import { MedregistratorEntity } from "../user/entities/medregistrator.entity";
import { DoctorSpecializationsEntity } from "../user/entities/doctor-specializations.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      OrganizationEntity,
      FilialEntity,
      PatientEntity,
      DoctorEntity,
      DocumentEntity,
      MedregistratorEntity,
      DoctorSpecializationsEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, JwtService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
