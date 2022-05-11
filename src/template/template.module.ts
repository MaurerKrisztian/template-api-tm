import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TemplateFactory } from "./TemplateFactory";

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, TemplateFactory]
})
export class TemplateModule {}
