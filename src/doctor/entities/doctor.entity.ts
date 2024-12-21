import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('doctors')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  doctor_id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  specialization: string;

  @Column()
  documents_link: string;

  @Column()
  work_experience: number;
}