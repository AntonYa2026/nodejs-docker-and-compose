import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service.js';
import type { SigninUserResponseDto, SignupUserResponseDto } from './dto/index.js';

import { GetUser, Public } from '../decorators/index.js';
import { LocalAuthGuard } from '../guards/local-auth.guard.js';
import type { CreateUserDto, UserProfileResponseDto } from '../users/dto/index.js';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@GetUser() user: UserProfileResponseDto): SigninUserResponseDto {
    return this.authService.login(user);
  }
}
