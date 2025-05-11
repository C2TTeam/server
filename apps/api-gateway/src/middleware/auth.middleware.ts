import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next();
    }

    try {
      const validationResult = await firstValueFrom(
        this.authService.validateToken(token)
      );

      if (validationResult.isValid) {
        req['user'] = {
          userId: validationResult.userId,
          username: validationResult.username,
          roles: validationResult.roles,
        };
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }

    next();
  }
}
