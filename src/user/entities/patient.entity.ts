import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { Gender } from "../enums/gender.enum";
import { EventEntity } from "../../events/entities/event.entity";

@Entity("patients")
export class PatientEntity {
  @PrimaryGeneratedColumn()
  patient_id: number;

  @OneToOne(() => UserEntity,  {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => EventEntity, (event) => event.patient)
  @JoinColumn()
  event: EventEntity;

  @Column()
  birthdate: Date;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ enum: Gender })
  gender: Gender;
}
