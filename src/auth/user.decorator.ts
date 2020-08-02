import { createParamDecorator } from '@nestjs/common';
import { UserReadDto } from 'src/connection/dto';

export const GetUser = createParamDecorator(
  (data, req): UserReadDto => {
    return req.user;
  },
);
