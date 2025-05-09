import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { routingConfigs } from '../configs/router';

@Module({
  imports: [...routingConfigs()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
