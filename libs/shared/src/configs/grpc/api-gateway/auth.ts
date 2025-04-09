import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  AUTH_PACKAGE_NAME,
} from '../../../proto/gen/auth.pb';
import * as dotenv from 'dotenv';
dotenv.config();

export const gRpcConfigs = (): ClientProviderOptions => ({
  name: AUTH_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    protoPath: `${process.env['PROTO_PACKAGE_PATH']}/auth.proto`,
    url: process.env['GRPC_URL_AUTH'],
    loader: {
      objects: true,
    },
  },
});
