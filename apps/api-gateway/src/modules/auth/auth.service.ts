import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DefaultRequest } from '@libs/shared/types';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  DefaultResponse,
} from '@libs/shared/proto/gen/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private service: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private client: ClientGrpc;

  onModuleInit() {
    this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  login(req: DefaultRequest): Observable<DefaultResponse> {
    return this.service.login(req);
  }

  logout(req: DefaultRequest): Observable<DefaultResponse> {
    return this.service.logout(req);
  }
}
