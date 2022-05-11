import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TemplateModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'playground'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
