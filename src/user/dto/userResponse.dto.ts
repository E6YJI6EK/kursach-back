import {Role} from "../enums/roles.enum";

export class UserResponseDto {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  organizationId: number;
  role: Role;
  constructor(data: {userId: number;
    username: string;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    organizationId: number;
    role: Role;}) {
    this.userId = data.userId
    this.username = data.username
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.patronymic = data.patronymic
    this.organizationId = data.organizationId
    this.role = data.role
  }
}