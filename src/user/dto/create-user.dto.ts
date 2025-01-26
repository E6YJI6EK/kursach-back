import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Role } from "../enums/roles.enum";
import { ApiProperty } from "@nestjs/swagger";
import { PatientDataDto } from "./patient-data.dto";
import { DoctorDataDto } from "./doctor-data.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  patronymic?: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  filialId: number;

  @ApiProperty({ type: PatientDataDto, required: false })
  @ValidateNested()
  @IsOptional()
  @Type(() => PatientDataDto)
  patientData?: PatientDataDto;

  @ApiProperty({ type: DoctorDataDto, required: false })
  @ValidateNested()
  @IsOptional()
  @Type(() => DoctorDataDto)
  doctorData?: DoctorDataDto;
}
