import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TemplateFactory } from './TemplateFactory';
import { MailModule } from '../mail/mail.module';
import { MailController } from './mail.controller';
import { TemplateMailService } from './services/template.mail.service';

@Module({
  imports: [MailModule],
  controllers: [TemplateController, MailController],
  providers: [TemplateMailService, TemplateService, TemplateFactory],
  exports: [TemplateFactory],
})
export class TemplateModule {}
