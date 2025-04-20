import { Inject, Injectable } from '@nestjs/common';
import {
    USER_SERVICE_NAME,
    UserServiceClient,
    DefaultResponse,
    DefaultRequest,
} from '@libs/shared/proto/gen/user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private service: UserServiceClient;
    
    @Inject(USER_SERVICE_NAME)
      private client: ClientGrpc;
    
    onModuleInit() {
        this.service = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }
    
    me(req: DefaultRequest): Observable<DefaultResponse> {
        return this.service.userInfo(req);
    }
   
}
