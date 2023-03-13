import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PORT } from './consts';

async function bootstrap() {
  console.log(`Server is listening on port ${API_PORT}\n`);

  const app = await NestFactory.create(AppModule);
  await app.listen(API_PORT);
}
bootstrap();
