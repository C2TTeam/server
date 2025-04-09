import { DefaultResponse } from '@libs/shared/proto/gen/auth.pb';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(req: LoginDto): Promise<DefaultResponse> {
    return {
      statusCode: 200,
      message: '',
      errors: [],
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    };
  }
}
