import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  DefaultResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@libs/shared/proto/gen/auth.pb';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(req: any): Promise<DefaultResponse> {
    return this.service.login(req);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Logout')
  private async logout(req: any): Promise<DefaultResponse> {
    return this.service.logout(req);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'ValidateToken')
  private async validateToken(req: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    return this.service.validateToken(req.token);
  }
}
