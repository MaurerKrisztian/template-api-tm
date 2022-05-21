import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TemplateFactory } from './TemplateFactory';
import { MailModule } from '../mail/mail.module';
import { MailController } from './mail.controller';
import { TemplateMailService } from './services/template.mail.service';
import {PdfService} from "./services/PdfService";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [MailModule, ConfigModule.forRoot({envFilePath: ".env", isGlobal: true})],
  controllers: [TemplateController, MailController],
  providers: [TemplateMailService, TemplateService, TemplateFactory, PdfService],
  exports: [TemplateFactory],
})
export class TemplateModule {}
