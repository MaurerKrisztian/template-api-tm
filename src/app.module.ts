import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TemplateModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'playground'),
      renderPath: '/playground',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
