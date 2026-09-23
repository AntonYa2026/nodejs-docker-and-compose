import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import type { UserProfileResponseDto } from '../users/dto/index.js';

export const GetUser = createParamDecorator(
  (
    data: keyof UserProfileResponseDto | undefined,
    context: ExecutionContext
  ) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    return data ? user[data] : user;
  }
);
