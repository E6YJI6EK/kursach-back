import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { DocumentEntity } from "../../files/entities/document.entity";
import { FilialEntity } from "../../organization/entities/filial.entity";
import { EventEntity } from "../../events/entities/event.entity";

@Entity("doctors")
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  doctor_id: number;

  @OneToOne(() => UserEntity, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => FilialEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  filial: FilialEntity;

  @OneToMany(() => EventEntity, (event) => event.patient)
  @JoinColumn()
  event: EventEntity;

  @Column()
  work_experience: number;

  @OneToMany(() => DocumentEntity, (document) => document.doctor, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  documents: DocumentEntity[];
}
