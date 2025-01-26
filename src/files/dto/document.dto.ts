import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";

export class DocumentDto {
  @ApiProperty()
  @IsString()
  link: string;
  @ApiProperty()
  @IsString()
  name: string;
}
