import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentDto } from "../../files/dto/document.dto";
import { Type } from "class-transformer";

export class DoctorDataDto {
  @ApiProperty({})
  @IsString()
  specialization: string;

  @ApiProperty({ type: Array<DocumentDto> })
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => DocumentDto)
  documentsLinks: DocumentDto[];

  @ApiProperty({})
  @IsNumber()
  workExperience: number;
}
