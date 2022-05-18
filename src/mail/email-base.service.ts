import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailBaseService {
  readonly logger = new Logger(EmailBaseService.name);

  transporter: Transporter;

  constructor() {
    this.transporter = this.getTransporter();
  }

  async sendMail(mailOptions: Mail.Options) {
    const info = await this.transporter.sendMail(mailOptions);
    this.logger.debug(`Send mail: ${JSON.stringify(info)}`);
    return info;
  }

  getTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
}
