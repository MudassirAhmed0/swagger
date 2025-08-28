import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();