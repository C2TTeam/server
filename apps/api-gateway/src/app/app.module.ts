import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { routingConfigs } from '../configs/router';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [...routingConfigs()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}