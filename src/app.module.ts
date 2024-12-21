import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { EventsModule } from './events/events.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AdminModule } from './admin/admin.module';
import { MedregistratorModule } from './medregistrator/medregistrator.module';
import {RolesGuard} from "./guards/role.guard";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./guards/jwt-auth.guards";
import {UserEntity} from "./user/entities/user.entity";
import {OrganizationEntity} from "./organization/entities/organization.entity";
import {DoctorEntity} from "./doctor/entities/doctor.entity";
import {PatientEntity} from "./patient/entities/patient.entity";
import {EventEntity} from "./events/entities/event.entity";
import {FilialEntity} from "./organization/entities/filial.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Делает ConfigModule доступным глобально
  }),TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'med-card-db',
    entities: [UserEntity, OrganizationEntity, DoctorEntity, PatientEntity, EventEntity, FilialEntity],
    synchronize: true,
  }), AuthModule, UserModule, OrganizationModule, EventsModule, PatientModule, DoctorModule, AdminModule, MedregistratorModule,],
})
export class AppModule {}
