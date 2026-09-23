import { Exclude, Expose } from 'class-transformer';
import {
  IsArray, IsDate, IsEmail, IsInt, IsString, IsUrl, Length, Min,
} from 'class-validator';

import type { OfferDto } from '@src/offers/dto/index';
import type { WishDto } from '@src/wishes/dto/index';
import type { WishlistDto } from '@src/wishlists/dto/index';

@Exclude()
export class UserDto {
  @Expose()
  @IsInt()
  @Min(1)
  id: number;

  @Expose()
  @IsString()
  @Length(1, 64)
  username: string;

  @Expose()
  @IsString()
  @Length(0, 200)
  about: string;

  @Expose()
  @IsUrl()
  avatar: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsArray()
  wishes: WishDto[];

  @Expose()
  @IsArray()
  offers: OfferDto[];

  @Expose()
  @IsArray()
  wishlists: WishlistDto[];
}
