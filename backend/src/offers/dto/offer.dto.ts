import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';

import { UserDto } from '@src/users/dto/index';
import { WishDto } from '@src/wishes/dto/index';

export class OfferDto {
  @IsNumber()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @Type(() => WishDto)
  @ValidateNested()
  item: WishDto;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @Type(() => UserDto)
  @IsOptional()
  @ValidateNested()
  user: UserDto | null;
}
