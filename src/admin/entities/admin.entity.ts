import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {FilialEntity} from "../../organization/entities/filial.entity";

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => FilialEntity)
  @JoinColumn()
  filial: FilialEntity;
}