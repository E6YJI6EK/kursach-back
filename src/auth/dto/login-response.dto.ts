import {Role} from "../../user/enums/roles.enum";

export class LoginResponseDto {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  organizationId: number;
  filialId: number;
  role: Role;
}