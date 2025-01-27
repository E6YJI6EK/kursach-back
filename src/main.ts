import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:5173"], // Allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    credentials: true, // Allow credentials (e.g., cookies)
  });
  const config = new DocumentBuilder()
    .setTitle("MED CARD API")
    .setDescription("API of med card crm system")
    .setVersion("1.0")
    .addTag("med-card")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
const baseUploadPath = path.join(__dirname, "..", "uploads");
const folders = ["events", "doctors"];

folders.forEach((folder) => {
  const fullPath = path.join(baseUploadPath, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

bootstrap();
