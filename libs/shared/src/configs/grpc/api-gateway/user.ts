import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
  USER_SERVICE_NAME,
  USER_PACKAGE_NAME,
} from '../../../proto/gen/user.pb';
import * as dotenv from 'dotenv';
dotenv.config();

export const gRpcConfigs = (): ClientProviderOptions => ({
    name: USER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
      package: USER_PACKAGE_NAME,
    protoPath: `${process.env['PROTO_PACKAGE_PATH']}/user.proto`,
    url: process.env['GRPC_URL_USER'],
    loader: {
      objects: true,
    },
  },
});
