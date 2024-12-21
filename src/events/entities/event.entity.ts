import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DoctorEntity} from "../../doctor/entities/doctor.entity";
import {PatientEntity} from "../../patient/entities/patient.entity";

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  event_id: number;

  @ManyToOne(() => DoctorEntity)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

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