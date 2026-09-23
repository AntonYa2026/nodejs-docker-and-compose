import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersController } from './offers.controller.js';
import { Offer } from './offers.entity.js';
import { OffersService } from './offers.service.js';

import { WishesModule } from '../wishes/wishes.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishesModule],
  providers: [OffersService],
  controllers: [OffersController],
  exports: [OffersService],
})
export class OffersModule {
}
