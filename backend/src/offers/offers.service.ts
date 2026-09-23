import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import type { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { CreateOfferDto, OfferDto } from './dto/index.js';
import { Offer } from './offers.entity.js';

import { WishesService } from '../wishes/wishes.service.js';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishService: WishesService
  ) {
  }

  async create(
    currentUserId: number,
    createOfferDto: CreateOfferDto
  ): Promise<Offer> {
    const { amount, hidden, itemId } = createOfferDto;

    const wish = await this.wishService.findOne({
      where: {
        id: itemId,
      },
      relations: { owner: true },
    });

    if (wish.owner.id === currentUserId) {
      throw new ForbiddenException('Нельзя вносить деньги на собственные подарки.');
    }

    const restSum = wish.price - wish.raised;

    if (amount > restSum) {
      throw new BadRequestException('Сумма взноса превышает остаток стоимости подарка.');
    }

    const offer = this.offerRepository.create({
      amount,
      hidden: hidden ?? false,
      item: wish,
      user: { id: currentUserId },
    });

    const savedOffer = await this.offerRepository.save(offer);

    wish.raised += amount;

    await this.wishService.updateOne(wish.id, { raised: wish.raised });

    return savedOffer;
  }

  async findOne(where: FindOptionsWhere<Offer>): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where,
      relations: { item: true, user: true },
    });

    if (!offer) {
      throw new NotFoundException('Предложение не найдено.');
    }

    return offer;
  }

  async findMany(options: FindManyOptions<Offer>): Promise<Offer[]> {
    return await this.offerRepository.find(options);
  }

  async createOffer(userId: number, dto: CreateOfferDto): Promise<OfferDto> {
    const offer = await this.create(userId, dto);

    return plainToInstance(OfferDto, offer);
  }

  async getOffer(id: number): Promise<OfferDto> {
    const offer = plainToInstance(OfferDto, await this.findOne({ id }));

    if (offer.hidden) {
      offer.user = null;
    }

    return offer;
  }

  async getOffers(): Promise<OfferDto[]> {
    const offers = await this.findMany({
      relations: { item: true, user: true },
    });

    return offers.map((offer) => {
      const offerDto = plainToInstance(OfferDto, offer);

      if (offer.hidden) {
        offerDto.user = null;
      }

      return offerDto;
    });
  }

  async updateOne(where: FindOptionsWhere<Offer>, data: Partial<Offer>): Promise<Offer> {
    const offer = await this.findOne(where);
    Object.assign(offer, data);

    return await this.offerRepository.save(offer);
  }

  async removeOne(where: FindOptionsWhere<Offer>): Promise<Offer> {
    const offer = await this.findOne(where);

    return await this.offerRepository.remove(offer);
  }
}
