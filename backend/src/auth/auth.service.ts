import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { type SigninUserDto, type SigninUserResponseDto, SignupUserResponseDto } from './dto/index.js';

import { type CreateUserDto, UserProfileResponseDto } from '../users/dto/index.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser({
    username,
    password,
  }: SigninUserDto): Promise<UserProfileResponseDto | null> {
    try {
      const user = await this.usersService.findOne(
        { username },
        {
          id: true,
          username: true,
          password: true,
          email: true,
          avatar: true,
          about: true,
        }
      );

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const { password: _password, ...profile } = user;

        return plainToInstance(UserProfileResponseDto, profile);
      }

      return null;
    } catch {
      return null;
    }
  }

  login(user: UserProfileResponseDto): SigninUserResponseDto {
    return { access_token: this.jwtService.sign({ sub: user.id, username: user.username }) };
  }

  async signup(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const { password, ...profile } = await this.usersService.create(createUserDto);

    return plainToInstance(SignupUserResponseDto, profile);
  }
}
