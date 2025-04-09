import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
// import { getWhiteList } from './whitelist-origin';

const acceptedMethods = ['GET', 'POST', 'PUT', 'HEAD'];

export const CORS_CONFIG: CorsOptions | CorsOptionsDelegate<any> = {
  origin: true,
  methods: acceptedMethods,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
