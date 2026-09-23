import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import type { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CreateWishDto, UpdateWishDto, WishDto } from './dto/index.js';
import { Wish } from './wishes.entity.js';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepository: Repository<Wish>) {
  }

  async create(
    currentUserId: number,
    {
      name, link, image, price, description,
    }: CreateWishDto
  ): Promise<Wish> {
    const wish = this.wishRepository.create({
      name,
      link,
      image,
      price,
      description,
      owner: { id: currentUserId },
    });

    return await this.wishRepository.save(wish);
  }

  async findOne(options: FindOneOptions<Wish>): Promise<Wish> {
    const wish = await this.wishRepository.findOne(options);

    if (!wish) {
      throw new NotFoundException('Подарок не найден.');
    }

    return wish;
  }

  async findMany(options: FindManyOptions<Wish>): Promise<Wish[]> {
    return await this.wishRepository.find(options);
  }

  async updateOne(wish: number | Wish, data: Partial<Wish>): Promise<Wish> {
    let wishEntity: Wish;

    if (typeof wish === 'number') {
      wishEntity = await this.findOne({
        where: { id: wish },
      });
    } else {
      wishEntity = wish;
    }

    Object.assign(wishEntity, data);

    return await this.wishRepository.save(wishEntity);
  }

  async removeOne(wish: number | Wish): Promise<Wish> {
    let wishEntity: Wish;

    if (typeof wish === 'number') {
      wishEntity = await this.findOne({ where: { id: wish } });
    } else {
      wishEntity = wish;
    }

    return await this.wishRepository.remove(wishEntity);
  }

  async createWish(userId: number, dto: CreateWishDto): Promise<WishDto> {
    return plainToInstance(WishDto, await this.create(userId, dto));
  }

  async getLastWishes(limit: number): Promise<WishDto[]> {
    const wishes = await this.findMany({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      relations: { owner: true, offers: true },
    });

    return plainToInstance(WishDto, wishes);
  }

  async getTopWishes(limit: number): Promise<WishDto[]> {
    const wishes = await this.findMany({
      order: {
        copied: 'DESC',
      },
      take: limit,
      relations: { owner: true, offers: true },
    });

    return plainToInstance(WishDto, wishes);
  }

  async getWishById(id: number): Promise<WishDto> {
    const wish = await this.findOne({
      where: { id },
      relations: { owner: true, offers: true },
    });

    return plainToInstance(WishDto, wish);
  }

  async updateWish(currentUserId: number, wishId: number, dto: UpdateWishDto): Promise<WishDto> {
    const wish = await this.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (wish.raised > 0) {
      throw new ForbiddenException('Нельзя внести изменения, т.к. уже есть желающие скинуться на подарок.');
    }

    if (wish.owner.id !== currentUserId) {
      throw new ForbiddenException('Нельзя редактировать/удалять чужие подарки.');
    }

    return plainToInstance(WishDto, await this.updateOne(wish, dto));
  }

  async deleteWish(currentUserId: number, wishId: number): Promise<WishDto> {
    const wish = await this.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (currentUserId !== wish.owner.id) {
      throw new ForbiddenException('Нельзя редактировать / удалять чужие подарки.');
    }

    return plainToInstance(WishDto, await this.removeOne(wish));
  }

  async copyWish(currentUserId: number, id: number): Promise<WishDto> {
    const wish = await this.findOne({ where: { id } });
    const { name, link, image, price, description } = wish;

    const copiedWish = await this.create(currentUserId, {
      name,
      link,
      image,
      price,
      description,
    });

    wish.copied += 1;

    await this.wishRepository.save(wish);

    return plainToInstance(WishDto, copiedWish);
  }
}
