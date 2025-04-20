import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

export const routingConfigs = () => [
  AuthModule,
  RouterModule.register([
    {
      path: 'auth',
      module: AuthModule,
    },
    {
      path: 'user',
      module: UserModule,
    }
  ]),
];
