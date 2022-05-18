import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { EmailBaseService } from './email-base.service';

@Injectable()
export class EmailService extends EmailBaseService {
  transporter: Transporter;

  constructor() {
    super();
  }
}
