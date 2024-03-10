import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/images', express.static(join(__dirname, '..', 'images')));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

