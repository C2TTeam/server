import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../modules/auth/auth.module';

export const routingConfigs = () => [
  AuthModule,
  RouterModule.register([
    {
      path: 'auth',
      module: AuthModule,
    },
  ]),
];
