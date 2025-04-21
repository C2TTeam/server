import { DefaultResponse } from '@libs/shared/proto/gen/auth.pb';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService 
  ){}


  async login(dto: LoginDto): Promise<DefaultResponse> {

    const user = await this.prisma.user.findUnique({ where: { username: dto.body.username } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${dto.body.username}`);
    }

   const isPasswordMatch = await bcrypt.compare(dto.body.password, user.password);
   if (!isPasswordMatch) throw new ForbiddenException('Email or password incorrect');
   const tokens = await this.generateTokens(user);
    return {
      statusCode: 200,
      message: '',
      errors: [],
      data:  {
        tokens,
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

  private async generateTokens(user) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: user.id }, { secret: process.env.JWT_SECRET, expiresIn: '15m' }),
      this.jwtService.signAsync({ sub: user.id }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }
}
