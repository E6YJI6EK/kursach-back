import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FilialEntity} from "./filial.entity";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  org_id: number;

  @Column()
  org_name: string;

  @Column({ nullable: true })
  org_description: string;

  @OneToMany(() => FilialEntity, (filial) => filial.organization)
  filials: FilialEntity[];

  @OneToMany(() => UserEntity, (user) => user.organization)
  users: UserEntity[];
}