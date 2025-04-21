import { DefaultRequest } from '@libs/shared/proto/gen/auth.pb';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginBodyDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto implements DefaultRequest {
  @IsObject()
  headers: any;

  @IsObject()
  query: any;

  @IsObject()
  params: any;

  @IsObject()
  @ValidateNested()
  @Type(() => LoginBodyDto)
  body: LoginBodyDto;
}
