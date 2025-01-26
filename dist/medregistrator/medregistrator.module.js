"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedregistratorModule = void 0;
const common_1 = require("@nestjs/common");
const medregistrator_controller_1 = require("./medregistrator.controller");
const medregistrator_service_1 = require("./medregistrator.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let MedregistratorModule = class MedregistratorModule {
};
exports.MedregistratorModule = MedregistratorModule;
exports.MedregistratorModule = MedregistratorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        controllers: [medregistrator_controller_1.MedregistratorController],
        providers: [medregistrator_service_1.MedregistratorService]
    })
], MedregistratorModule);
//# sourceMappingURL=medregistrator.module.js.map