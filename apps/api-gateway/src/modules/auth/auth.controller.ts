import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DefaultResponse } from '@libs/shared/types/grpc';
import { Observable } from 'rxjs';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  // @ApiResponse({
  //   status: 200,
  //   type: ,
  // })
  async login(@Req() req: any): Promise<Observable<DefaultResponse>> {
    return this.service.login(req);
  }
}
