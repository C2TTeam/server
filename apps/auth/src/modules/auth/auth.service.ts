import { DefaultResponse, ValidateTokenResponse } from '@libs/shared/proto/gen/auth.pb';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt/jwt.service';

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
    
    const tokens = await this.jwtService.generateTokens(user);
    
    return {
      statusCode: 200,
      message: 'Login successful',
      errors: [],
      data: {
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

  async validateToken(token: string): Promise<ValidateTokenResponse> {
    return this.jwtService.validateToken(token);
  }
}
