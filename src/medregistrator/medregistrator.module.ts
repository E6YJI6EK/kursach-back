import { Module } from '@nestjs/common';
import { MedregistratorController } from './medregistrator.controller';
import { MedregistratorService } from './medregistrator.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [MedregistratorController],
  providers: [MedregistratorService]
})
export class MedregistratorModule {}
