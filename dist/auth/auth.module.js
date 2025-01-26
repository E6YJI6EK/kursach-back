"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
const organization_entity_1 = require("../organization/entities/organization.entity");
const filial_entity_1 = require("../organization/entities/filial.entity");
const patient_entity_1 = require("../user/entities/patient.entity");
const doctor_entity_1 = require("../user/entities/doctor.entity");
const document_entity_1 = require("../files/entities/document.entity");
const medregistrator_entity_1 = require("../user/entities/medregistrator.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secretOrPrivateKey: configService.get("JWT_SECRET"),
                    signOptions: { expiresIn: "1h" },
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                organization_entity_1.OrganizationEntity,
                filial_entity_1.FilialEntity,
                patient_entity_1.PatientEntity,
                doctor_entity_1.DoctorEntity,
                document_entity_1.DocumentEntity,
                medregistrator_entity_1.MedregistratorEntity,
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, user_service_1.UserService, jwt_strategy_1.JwtStrategy, jwt_1.JwtService],
        exports: [jwt_1.JwtModule, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map