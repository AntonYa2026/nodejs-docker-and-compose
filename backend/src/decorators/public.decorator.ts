import { SetMetadata } from '@nestjs/common';
import { type CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const PUBLIC_KEY = 'public-key';

export const Public = (): CustomDecorator => SetMetadata(PUBLIC_KEY, true);
