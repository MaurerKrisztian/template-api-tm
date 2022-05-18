import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { TemplateMailService } from './services/template.mail.service';
import Mail from 'nodemailer/lib/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailTemplateService: TemplateMailService) {}

  @Post('')
  async findOne(
    @Body()
    body: {
      mailOptions: Omit<Mail.Options, 'html'>;
      template: { name: string; data: any };
    },
  ) {
    return this.mailTemplateService.send(
      body.mailOptions,
      body.template.name,
      body.template.data,
    );
  }
}
