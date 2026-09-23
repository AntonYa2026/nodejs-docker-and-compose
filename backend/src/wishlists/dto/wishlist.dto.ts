import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, IsUrl, Length, ValidateNested } from 'class-validator';

import { UserPublicProfileResponseDto } from '@src/users/dto/index';
import { WishPartialDto } from '@src/wishes/dto/index';

export class WishlistDto {
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
  image: string;

  @Type(() => UserPublicProfileResponseDto)
  @ValidateNested()
  owner: UserPublicProfileResponseDto;

  @Type(() => WishPartialDto)
  @IsArray()
  @ValidateNested({ each: true })
  items: WishPartialDto[];
}
