import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { FilialEntity } from "../../organization/entities/filial.entity";

@Entity("medregistrators")
export class MedregistratorEntity {
  @PrimaryGeneratedColumn()
  medregistrator_id: number;

  @OneToOne(() => UserEntity,  {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => FilialEntity)
  @JoinColumn()
  filial: FilialEntity;
}
