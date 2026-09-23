import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsString, IsUrl, Length, Min } from 'class-validator';

@Exclude()
export class UserProfileResponseDto {
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
}
