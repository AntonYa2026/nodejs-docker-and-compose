import { PartialType } from '@nestjs/mapped-types';

import { WishDto } from '@src/wishes/dto/wish.dto';

export class WishPartialDto extends PartialType(WishDto) {
}
