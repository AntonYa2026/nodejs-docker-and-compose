import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishlistsController } from './wishlists.controller.js';
import { Wishlist } from './wishlists.entity.js';
import { WishlistsService } from './wishlists.service.js';

import { WishesModule } from '../wishes/wishes.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), WishesModule],
  providers: [WishlistsService],
  controllers: [WishlistsController],
  exports: [WishlistsService],
})
export class WishlistsModule {
}
