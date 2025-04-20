import { DefaultResponse } from '@libs/shared/proto/gen/auth.pb';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService ){}


  async login(req: any): Promise<DefaultResponse> {

    const user = await this.prismaService.user.findMany()
    console.log({user});
    

    return {
      statusCode: 200,
      message: '',
      errors: [],
      data: {
      },
    };
  }

  async logout(req: LoginDto): Promise<DefaultResponse> {
    return {
      statusCode: 200,
      message: '',
      errors: [],
      data: {
        message : "logout"
      },
    };
  }
}
