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
exports.OrganizationEntity = void 0;
const typeorm_1 = require("typeorm");
const filial_entity_1 = require("./filial.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let OrganizationEntity = class OrganizationEntity {
};
exports.OrganizationEntity = OrganizationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganizationEntity.prototype, "org_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "org_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "org_description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => filial_entity_1.FilialEntity, (filial) => filial.organization),
    __metadata("design:type", Array)
], OrganizationEntity.prototype, "filials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (user) => user.organization),
    __metadata("design:type", Array)
], OrganizationEntity.prototype, "users", void 0);
exports.OrganizationEntity = OrganizationEntity = __decorate([
    (0, typeorm_1.Entity)('organizations')
], OrganizationEntity);
//# sourceMappingURL=organization.entity.js.map