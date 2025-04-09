/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { CORS_CONFIG } from '@libs/shared/configs/cors/configs';

async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('WereHouse Manager')
    .setDescription('The WereHouse Manager API description')
    .setVersion('1.0')
    .addTag('warehouse-manager')
    .addBearerAuth()
    .build();
  const app = await NestFactory.create(AppModule, {
    snapshot: process.env.NODE_ENV !== 'production',
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, options);
  // process.env.NODE_ENV !== 'production' &&
  SwaggerModule.setup('swagger-ui', app, document);
  app.use(helmet());
  app.enableCors(CORS_CONFIG);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
