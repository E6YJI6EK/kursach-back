import { OrganizationEntity } from "../../organization/entities/organization.entity";
import { Role } from "../enums/roles.enum";
export declare class UserEntity {
    user_id: number;
    last_name: string;
    first_name: string;
    patronymic: string;
    userName: string;
    password: string;
    role: Role;
    organization: OrganizationEntity;
    validatePassword(password: string): Promise<boolean>;
}
