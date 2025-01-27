import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrganizationEntity } from "../../organization/entities/organization.entity";

@Entity("medical-services")
export class MedicalServicesEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => OrganizationEntity)
  @JoinTable()
  organizations: OrganizationEntity[];
}
