import type { UserProfileResponseDto } from './users/dto/index.ts';

declare module 'express' {
  interface Request {
    user: UserProfileResponseDto;
  }
}
