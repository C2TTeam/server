import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  DefaultResponse,
} from '@libs/shared/proto/gen/auth.pb';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(req: any): Promise<DefaultResponse> {
    return this.service.login(req);
  }
}
