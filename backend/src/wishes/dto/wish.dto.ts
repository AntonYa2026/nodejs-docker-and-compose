import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, IsUrl, Length, Min, ValidateNested } from 'class-validator';

import { OfferDto } from '@src/offers/dto/index';
import { UserPublicProfileResponseDto } from '@src/users/dto/index';

export class WishDto {
  @IsNumber()
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

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsNumber()
  copied: number;

  @Type(() => UserPublicProfileResponseDto)
  @ValidateNested()
  owner: UserPublicProfileResponseDto;

  @Type(() => OfferDto)
  @IsArray()
  @ValidateNested({ each: true })
  offers: OfferDto[];
}
