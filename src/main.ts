import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

export const port = process.env.PORT || '3012';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  app.enableCors();
  await app.listen(port);

  await appService.validateExampleDatas();
}
bootstrap();
