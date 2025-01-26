import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DoctorEntity} from "../../user/entities/doctor.entity";
import {PatientEntity} from "../../user/entities/patient.entity";
import {DocumentEntity} from "../../files/entities/document.entity";

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  event_id: number;

  @ManyToOne(() => DoctorEntity, (doc) => doc.event)
  @JoinColumn()
  doctor: DoctorEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.event)
  @JoinColumn()
  patient: PatientEntity;

  @OneToMany(() => DocumentEntity, (document) => document.event)
  @JoinColumn()
  documents: DocumentEntity[];

  @Column()
  event_date: Date;

  @Column()
  documents_link: string;

  @Column()
  event_type: string;

  @Column()
  event_status: string;

  @Column()
  event_description: string;
}