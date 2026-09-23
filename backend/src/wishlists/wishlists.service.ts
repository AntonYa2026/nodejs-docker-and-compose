import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { type FindManyOptions, type FindOptionsRelations, type FindOptionsWhere, In, type Repository } from 'typeorm';

import { CreateWishlistDto, UpdateWishlistDto, WishlistDto } from './dto/index.js';
import { Wishlist } from './wishlists.entity.js';

import { WishesService } from '../wishes/wishes.service.js';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService
  ) {
  }

  async create(
    userId: number,
    createWishlistDto: CreateWishlistDto
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = createWishlistDto;

    const wishes = itemsId
      ? await this.wishesService.findMany({
        where: {
          id: In(itemsId),
        },
      })
      : [];

    const wishlist = this.wishlistRepository.create({
      ...rest,
      items: wishes,
      owner: { id: userId },
    });

    return await this.wishlistRepository.save(wishlist);
  }

  async findOne(
    where: FindOptionsWhere<Wishlist>,
    relations?: FindOptionsRelations<Wishlist>
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where,
      relations,
    });

    if (!wishlist) {
      throw new NotFoundException('Вишлист не найден.');
    }

    return wishlist;
  }

  async findMany(options: FindManyOptions<Wishlist>): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({
      ...options,
    });
  }

  async updateOne(
    wishlistId: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(
      { id: wishlistId },
      { items: true, owner: true }
    );

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Нельзя редактировать / удалять чужие подборки.');
    }

    const { itemsId, ...rest } = updateWishlistDto;

    if (itemsId) {
      wishlist.items = await this.wishesService.findMany({
        where: {
          id: In(itemsId),
        },
      });
    }

    Object.assign(wishlist, rest);

    return await this.wishlistRepository.save(wishlist);
  }

  async removeOne(
    userId: number,
    where: FindOptionsWhere<Wishlist>
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(where, { owner: true });

    if (userId !== wishlist.owner.id) {
      throw new ForbiddenException('Нельзя редактировать / удалять чужие подборки.');
    }

    return await this.wishlistRepository.remove(wishlist);
  }

  async createWishlist(
    userId: number,
    createWishListDto: CreateWishlistDto
  ): Promise<WishlistDto> {
    const wishlist = await this.create(userId, createWishListDto);

    return plainToInstance(WishlistDto, wishlist);
  }

  async getWishlists(): Promise<WishlistDto[]> {
    const wishlists = await this.findMany({
      relations: { items: true, owner: true },
    });

    return plainToInstance(WishlistDto, wishlists);
  }

  async getWishlist(id: number): Promise<WishlistDto> {
    const wishlist = await this.findOne({ id }, { items: true, owner: true });

    return plainToInstance(WishlistDto, wishlist);
  }

  async updateWishlist(
    id: number,
    updateWishListDto: UpdateWishlistDto,
    userId: number
  ): Promise<WishlistDto> {
    const wishlist = await this.updateOne(id, updateWishListDto, userId);

    return plainToInstance(WishlistDto, wishlist);
  }

  async deleteWishlist(id: number, userId: number): Promise<WishlistDto> {
    const deletedWishlist = await this.removeOne(userId, { id });

    return plainToInstance(WishlistDto, deletedWishlist);
  }
}
