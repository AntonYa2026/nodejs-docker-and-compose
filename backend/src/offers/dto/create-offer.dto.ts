import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Не указана сумма сбора на подарок.' }
  )
  @Min(1)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsInt({ message: 'Не указан подарок, на который скидываются пользователи.' })
  itemId: number;
}
