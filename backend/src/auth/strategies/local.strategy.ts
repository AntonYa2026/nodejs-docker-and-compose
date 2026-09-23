import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service.js';

import type { UserProfileResponseDto } from '@src/users/dto/index';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<UserProfileResponseDto> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException('Неправильное имя пользователя или пароль.');
    }

    return user;
  }
}
