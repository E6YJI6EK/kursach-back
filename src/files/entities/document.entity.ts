import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DoctorEntity } from "../../user/entities/doctor.entity";
import { EventEntity } from "../../events/entities/event.entity";

@Entity("documents")
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  name: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.documents)
  @JoinColumn()
  doctor: DoctorEntity;

  @ManyToOne(() => EventEntity, (event) => event.documents, { cascade: true })
  @JoinColumn()
  event: EventEntity;
}
