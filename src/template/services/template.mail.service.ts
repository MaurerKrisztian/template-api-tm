import { Injectable, Logger } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { EmailService } from '../../mail/email.service';
import { TemplateService } from '../template.service';

@Injectable()
export class TemplateMailService {
  private readonly logger = new Logger(TemplateMailService.name);
  constructor(
    private readonly mailService: EmailService,
    private readonly templateService: TemplateService,
  ) {}

  async send(
    mailOptions: Omit<Mail.Options, 'html'>,
    template: string,
    templateData: any,
  ) {
    const html = await this.templateService.getHtmlWithData(
      template,
      templateData,
    );
    return await this.mailService.sendMail({
      ...mailOptions,
      ...{ html: html },
    });
  }
}
