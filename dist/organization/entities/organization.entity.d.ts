import { FilialEntity } from "./filial.entity";
import { UserEntity } from "../../user/entities/user.entity";
export declare class OrganizationEntity {
    org_id: number;
    org_name: string;
    org_description: string;
    filials: FilialEntity[];
    users: UserEntity[];
}
