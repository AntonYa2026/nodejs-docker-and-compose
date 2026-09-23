import {
  IsArray, IsDate, IsInt, IsNumber, IsString, IsUrl, Length, Min,
} from 'class-validator';

import type { OfferDto } from '@src/offers/dto/index';

export class UserWishesDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  price: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  raised: number;

  @IsInt()
  @Min(0)
  copied: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsArray()
  offers: OfferDto[];
}
