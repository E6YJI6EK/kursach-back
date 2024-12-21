import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength} from "class-validator";
import {Role} from "../../user/enums/roles.enum";

export  class UpdateUserDto {
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
  filialId: number;
}

