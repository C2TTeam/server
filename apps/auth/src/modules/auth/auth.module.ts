import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'apps/auth/prisma/prisma.module';

@Module({
  imports:[JwtModule, PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
