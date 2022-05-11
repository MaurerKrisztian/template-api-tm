import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const port = process.env.PORT || '3012';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
