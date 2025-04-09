import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { gRpcConfigs } from '@libs/shared/configs/grpc/api-gateway/auth';

@Module({
  imports: [ClientsModule.register([gRpcConfigs()])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
