import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from '../app.module';
import { swaggerConfig } from '../swagger.config';

async function generateOpenApi() {
  const app = await NestFactory.create(AppModule);


    const version = swaggerConfig.info.version

      const document = SwaggerModule.createDocument(app, swaggerConfig);
    // SwaggerModule.setup('api', app, document); 
      writeFileSync(`./src/docs/openapi.v${version}.json`, JSON.stringify(document,null,2)); 
      return document
}
generateOpenApi();
