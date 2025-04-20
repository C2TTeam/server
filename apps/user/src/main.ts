/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { gRpcConfigs } from '@libs/shared/configs/grpc/user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(gRpcConfigs());

  const port = process.env.PORT || 3002;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
