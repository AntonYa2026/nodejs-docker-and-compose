import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  FindUsersDto, UpdateUserDto, UserProfileResponseDto, UserPublicProfileResponseDto, UserWishesDto,
} from './dto/index.js';
import { UsersService } from './users.service.js';

import { GetUser } from '../decorators/index.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('me')
  async getMyProfile(
    @GetUser('id') id: number
  ): Promise<UserProfileResponseDto> {
    const { password, ...profile } = await this.usersService.findOne({ id });

    return plainToInstance(UserProfileResponseDto, profile);
  }

  @Patch('me')
  async updateMyProfile(
    @GetUser('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserProfileResponseDto> {
    return await this.usersService.updateProfile(id, updateUserDto);
  }

  @Get('me/wishes')
  async getMyWishes(@GetUser('id') id: number): Promise<UserWishesDto[]> {
    return await this.usersService.getUserWishes({ id });
  }

  @Get(':username')
  async getByUsername(@Param('username') username: string): Promise<UserPublicProfileResponseDto> {
    return await this.usersService.getPublicProfile(username);
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string): Promise<UserWishesDto[]> {
    return await this.usersService.getUserWishes({ username });
  }

  @Post('find')
  async findMany(@Body() query: FindUsersDto): Promise<UserProfileResponseDto[]> {
    return await this.usersService.getUsers(query);
  }
}
