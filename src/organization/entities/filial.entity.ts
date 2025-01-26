import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrganizationEntity} from "./organization.entity";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('filials')
export class FilialEntity {
  @PrimaryGeneratedColumn()
  filial_id: number;

  @Column()
  address: string;

  @Column()
  phone_number: string;


  @ManyToOne(() => OrganizationEntity, (org) => org.filials)
  organization: OrganizationEntity;
}