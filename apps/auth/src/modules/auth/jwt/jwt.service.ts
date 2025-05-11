import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ValidateTokenResponse } from '@libs/shared/proto/gen/auth.pb';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateTokens(user: any) {
    const payload = { sub: user.id, username: user.username };
    
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'hard-to-guess-secret',
        expiresIn: '60s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'hard-to-guess-refresh-secret',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async validateToken(token: string): Promise<ValidateTokenResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'hard-to-guess-secret',
      });
  
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });
  
      if (!user) {
        return {
          isValid: false,
          userId: 0,
          username: '',
          roles: [],
        };
      }
  
      return {
        isValid: true,
        userId: user.id,
        username: user.username,
        roles: user.userRoles.map(ur => ur.role.name),
      };
    } catch (e) {
      return {
        isValid: false,
        userId: 0,
        username: '',
        roles: [],
      };
    }
  }
  
}