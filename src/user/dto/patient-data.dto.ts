import { IsDate, IsEmail, IsEnum, IsString } from "class-validator";
import { Gender } from "../enums/gender.enum";

export class PatientDataDto {
  @IsDate()
  birthdate: Date;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  @IsEnum(Gender)
  gender: Gender;
}
