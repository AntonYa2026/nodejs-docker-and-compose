import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { PORT } from './constants.js';

const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:3001',
  credentials: true,
});
app.useGlobalPipes(new ValidationPipe({ transform: true }));
await app.listen(PORT);
