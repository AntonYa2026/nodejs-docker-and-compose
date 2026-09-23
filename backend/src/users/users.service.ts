import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import {
  type FindManyOptions, type FindOptionsRelations, type FindOptionsSelect, type FindOptionsWhere,
  type Repository, Like,
} from 'typeorm';

import {
  CreateUserDto, FindUsersDto, UpdateUserDto, UserProfileResponseDto, UserPublicProfileResponseDto, UserWishesDto,
} from './dto/index.js';
import { User } from './users.entity.js';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create({ username, about, avatar, email, password }: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      username,
      about,
      avatar,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return await this.userRepository.save(user);
  }

  async findOne(
    where: FindOptionsWhere<User>,
    select?: FindOptionsSelect<User>,
    relations?: FindOptionsRelations<User>
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where, select, relations });

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    return user;
  }

  async findMany(options: FindManyOptions<User>): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne({ id });

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async getUsers(findUsersDto: FindUsersDto): Promise<UserProfileResponseDto[]> {
    const { query } = findUsersDto;

    const users = await this.findMany({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });

    return plainToInstance(UserProfileResponseDto, users.map(({ password, ...user }) => user));
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    const { password, ...profile } = await this.updateOne(id, updateUserDto);

    return plainToInstance(UserProfileResponseDto, profile);
  }

  async getPublicProfile(username: string): Promise<UserPublicProfileResponseDto> {
    const { password, ...profile } = await this.findOne({ username });

    return plainToInstance(UserPublicProfileResponseDto, profile);
  }

  async getUserWishes(where: FindOptionsWhere<User>): Promise<UserWishesDto[]> {
    const { wishes } = await this.findOne(where, undefined, {
      wishes: true,
    });

    return plainToInstance(UserWishesDto, wishes);
  }
}
