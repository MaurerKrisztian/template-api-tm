import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailBaseService } from './email-base.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [EmailService, EmailBaseService],
  exports: [EmailService, EmailBaseService],
})
export class MailModule {}
