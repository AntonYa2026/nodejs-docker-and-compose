import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import {
  POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER,
} from './constants.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { OffersModule } from './offers/offers.module.js';
import { UsersModule } from './users/users.module.js';
import { WishesModule } from './wishes/wishes.module.js';
import { WishlistsModule } from './wishlists/wishlists.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory() {
        return {
          type: 'postgres',
          logging: true,
          synchronize: true,
          host: POSTGRES_HOST,
          port: POSTGRES_PORT,
          username: POSTGRES_USER,
          password: POSTGRES_PASSWORD,
          database: POSTGRES_DB,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
}
