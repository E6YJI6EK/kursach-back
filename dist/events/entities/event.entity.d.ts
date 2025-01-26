import { DoctorEntity } from "../../user/entities/doctor.entity";
import { PatientEntity } from "../../user/entities/patient.entity";
import { DocumentEntity } from "../../files/entities/document.entity";
export declare class EventEntity {
    event_id: number;
    doctor: DoctorEntity;
    patient: PatientEntity;
    documents: DocumentEntity[];
    event_date: Date;
    documents_link: string;
    event_type: string;
    event_status: string;
    event_description: string;
}
