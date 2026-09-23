import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsInt, IsString, IsUrl, Length, Min } from 'class-validator';

@Exclude()
export class UserPublicProfileResponseDto {
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
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
