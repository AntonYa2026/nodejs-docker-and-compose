import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import type { CreateOfferDto, OfferDto } from './dto/index.js';
import { OffersService } from './offers.service.js';

import { GetUser } from '../decorators/index.js';
import type { IdParamDto } from '../dtos/index.js';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {
  }

  @Post()
  async createOffer(
    @GetUser('id') userId: number,
    @Body() dto: CreateOfferDto
  ): Promise<OfferDto> {
    return await this.offersService.createOffer(userId, dto);
  }

  @Get()
  async getOffers(): Promise<OfferDto[]> {
    return await this.offersService.getOffers();
  }

  @Get(':id')
  async getOffer(@Param() params: IdParamDto): Promise<OfferDto> {
    return await this.offersService.getOffer(params.id);
  }
}
