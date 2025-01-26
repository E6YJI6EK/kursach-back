import { UserEntity } from "../../user/entities/user.entity";
import { FilialEntity } from "../../organization/entities/filial.entity";
export declare class Admin {
    admin_id: number;
    user: UserEntity;
    filial: FilialEntity;
}
