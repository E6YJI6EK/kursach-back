import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,} from "typeorm";
import {DoctorEntity} from "./doctor.entity";

@Entity("doctor-specializations")
export class DoctorSpecializationsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => DoctorEntity)
  @JoinTable()
  doctors: DoctorEntity[];
}
