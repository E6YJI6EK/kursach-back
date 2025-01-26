"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEntity = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("../../user/entities/doctor.entity");
const patient_entity_1 = require("../../user/entities/patient.entity");
const document_entity_1 = require("../../files/entities/document.entity");
let EventEntity = class EventEntity {
};
exports.EventEntity = EventEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventEntity.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.DoctorEntity, (doc) => doc.event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", doctor_entity_1.DoctorEntity)
], EventEntity.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.PatientEntity, (patient) => patient.event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", patient_entity_1.PatientEntity)
], EventEntity.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.DocumentEntity, (document) => document.event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], EventEntity.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EventEntity.prototype, "event_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "documents_link", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "event_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "event_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "event_description", void 0);
exports.EventEntity = EventEntity = __decorate([
    (0, typeorm_1.Entity)('events')
], EventEntity);
//# sourceMappingURL=event.entity.js.map