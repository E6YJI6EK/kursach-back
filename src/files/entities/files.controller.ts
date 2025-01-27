import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Res,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Response } from 'express';
import * as path from "node:path";
import * as fs from "node:fs";

@Controller("files")
export class FileController {
  private readonly uploadBasePath = "./uploads"; // Базовый путь к папке загрузок

  @Get(":type/:id")
  async getFile(
    @Param("type") type: string,
    @Param("id") id: string,
    @Res() res: Response,
  ) {
    try {
      // Определение пути к папке по типу
      const folder = type === "events" ? "events" : "doctors";
      const directoryPath = path.join(this.uploadBasePath, folder);

      // Поиск файла с соответствующим ID
      const files = fs.readdirSync(directoryPath);
      const file = files.find((file) => file.startsWith(`${id}-`));

      if (!file) {
        throw new HttpException("File not found", HttpStatus.NOT_FOUND);
      }

      // Полный путь к файлу
      const filePath = path.join(directoryPath, file);

      // Отправка файла в ответ
      res.sendFile(filePath, { root: "." });
    } catch (error) {
      throw new HttpException(
        error.message || "Error while retrieving file",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post("upload/:type/:id")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const type = req.params.type; // Тип (events или doctors)
          const folder = type === "events" ? "events" : "doctors";
          const uploadPath = `./uploads/${folder}`;
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const id = req.params.id; // ID события или доктора
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Расширение файла
          const filename = `${id}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("type") type: string,
    @Param("id") id: string,
  ) {
    return {
      message: "File uploaded successfully",
      filename: file.filename,
      path: `/uploads/${type}/${file.filename}`, // Путь к файлу
    };
  }
}
