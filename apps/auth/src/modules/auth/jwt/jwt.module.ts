import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from './jwt.service';

@Module({
    imports: [
      NestJwtModule.register({
        secret: process.env.JWT_SECRET || 'hard-to-guess-secret',
        signOptions: { expiresIn: '60s' },
      }),
    ],
    providers: [JwtStrategy, JwtService],
    exports: [JwtService],
  })
  export class JwtModule {}