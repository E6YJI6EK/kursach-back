import { Module } from "@nestjs/common";
import { FileController } from "./entities/files.controller";

@Module({
  controllers: [FileController],
})
export class FilesModule {}
