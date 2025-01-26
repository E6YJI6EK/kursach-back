import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrganizationEntity } from "../../organization/entities/organization.entity";
import { Role } from "../enums/roles.enum";
import * as bcrypt from "bcryptjs";
import { PatientEntity } from "./patient.entity";
import { DoctorEntity } from "./doctor.entity";
import {MedregistratorEntity} from "./medregistrator.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ enum: Role })
  role: Role;

  // @OneToOne(() => PatientEntity, (p) => p.user)
  // patient: PatientEntity;
  //
  // @OneToOne(() => DoctorEntity, (d) => d.user)
  // doctor: DoctorEntity;
  //
  // @OneToOne(() => MedregistratorEntity, (m) => m.user)
  // medRegistrar: MedregistratorEntity;

  @ManyToOne(() => OrganizationEntity, (org) => org.users)
  organization: OrganizationEntity;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    return hash === this.password;
  }
}
