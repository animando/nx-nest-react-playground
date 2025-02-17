/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { logger } from '@animando/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  await app.init();
}

bootstrap();
