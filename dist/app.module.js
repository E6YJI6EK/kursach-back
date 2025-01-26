"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const organization_module_1 = require("./organization/organization.module");
const events_module_1 = require("./events/events.module");
const patient_module_1 = require("./patient/patient.module");
const doctor_module_1 = require("./doctor/doctor.module");
const admin_module_1 = require("./admin/admin.module");
const medregistrator_module_1 = require("./medregistrator/medregistrator.module");
const role_guard_1 = require("./guards/role.guard");
const core_1 = require("@nestjs/core");
const user_entity_1 = require("./user/entities/user.entity");
const organization_entity_1 = require("./organization/entities/organization.entity");
const doctor_entity_1 = require("./user/entities/doctor.entity");
const patient_entity_1 = require("./user/entities/patient.entity");
const event_entity_1 = require("./events/entities/event.entity");
const filial_entity_1 = require("./organization/entities/filial.entity");
const config_1 = require("@nestjs/config");
const files_module_1 = require("./files/files.module");
const document_entity_1 = require("./files/entities/document.entity");
const medregistrator_entity_1 = require("./user/entities/medregistrator.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "root",
                database: "med-card-db",
                entities: [
                    user_entity_1.UserEntity,
                    organization_entity_1.OrganizationEntity,
                    doctor_entity_1.DoctorEntity,
                    patient_entity_1.PatientEntity,
                    event_entity_1.EventEntity,
                    filial_entity_1.FilialEntity,
                    document_entity_1.DocumentEntity,
                    medregistrator_entity_1.MedregistratorEntity,
                ],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            organization_module_1.OrganizationModule,
            events_module_1.EventsModule,
            patient_module_1.PatientModule,
            doctor_module_1.DoctorModule,
            admin_module_1.AdminModule,
            medregistrator_module_1.MedregistratorModule,
            files_module_1.FilesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map