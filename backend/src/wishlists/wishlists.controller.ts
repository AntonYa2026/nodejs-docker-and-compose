import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import type { CreateWishlistDto, UpdateWishlistDto, WishlistDto } from './dto/index.js';
import { WishlistsService } from './wishlists.service.js';

import { GetUser } from '../decorators/index.js';
import type { IdParamDto } from '../dtos/index.js';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {
  }

  @Get()
  async getAllLists(): Promise<WishlistDto[]> {
    return await this.wishlistsService.getWishlists();
  }

  @Post()
  async createWishlist(
    @GetUser('id') currentUserId: number,
    @Body() dto: CreateWishlistDto
  ): Promise<WishlistDto> {
    return await this.wishlistsService.createWishlist(currentUserId, dto);
  }

  @Get(':id')
  async getWishlist(@Param() params: IdParamDto): Promise<WishlistDto> {
    return await this.wishlistsService.getWishlist(params.id);
  }

  @Patch(':id')
  async updateWishlist(
    @Param() params: IdParamDto,
    @GetUser('id') userId: number,
    @Body() dto: UpdateWishlistDto
  ): Promise<WishlistDto> {
    return await this.wishlistsService.updateWishlist(params.id, dto, userId);
  }

  @Delete(':id')
  async removeWishlist(
    @Param() params: IdParamDto,
    @GetUser('id') userId: number
  ): Promise<WishlistDto> {
    return await this.wishlistsService.deleteWishlist(params.id, userId);
  }
}
