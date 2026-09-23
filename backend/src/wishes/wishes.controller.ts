import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import type { CreateWishDto, UpdateWishDto, WishDto } from './dto/index.js';
import { WishesService } from './wishes.service.js';

import { GetUser, Public } from '../decorators/index.js';
import type { IdParamDto } from '../dtos/index.js';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {
  }

  @Post()
  async createWish(
    @GetUser('id') userId: number,
    @Body() createWishDto: CreateWishDto
  ): Promise<WishDto> {
    return await this.wishesService.createWish(userId, createWishDto);
  }

  @Public()
  @Get('last')
  async getLast(): Promise<WishDto[]> {
    return await this.wishesService.getLastWishes(40);
  }

  @Public()
  @Get('top')
  async getTop(): Promise<WishDto[]> {
    return await this.wishesService.getTopWishes(20);
  }

  @Get(':id')
  async getWish(@Param() params: IdParamDto): Promise<WishDto> {
    return await this.wishesService.getWishById(params.id);
  }

  @Patch(':id')
  async updateWish(
    @GetUser('id') userId: number,
    @Param() params: IdParamDto,
    @Body() updateWishDto: UpdateWishDto
  ): Promise<WishDto> {
    return await this.wishesService.updateWish(
      userId,
      params.id,
      updateWishDto
    );
  }

  @Delete(':id')
  async removeWish(
    @GetUser('id') userId: number,
    @Param() params: IdParamDto
  ): Promise<WishDto> {
    return await this.wishesService.deleteWish(userId, params.id);
  }

  @Post(':id/copy')
  copyWish(
    @GetUser('id') userId: number,
    @Param() params: IdParamDto
  ): Promise<WishDto> {
    return this.wishesService.copyWish(userId, params.id);
  }
}
