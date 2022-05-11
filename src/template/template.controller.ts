import {
  Controller,
  Get,
  Post,
  Body,
  Param,
   Headers,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  findAll(@Headers() headers) {
    return this.templateService.findAll(process.env.MY_HOST || headers?.host);
  }

  @Post(':name')
  findOne(@Param('name') name: string, @Body() body: any) {
    return this.templateService.findOne(name, body?.data);
  }
  @Get(':name/example')
  exampleData(@Param('name') name: string) {
    return this.templateService.getWithExampleData(name);
  }

  @Get(':name/exampleData')
  getExampleDataForTemplate(@Param('name') name: string) {
    return this.templateService.getExampleDataForTemplate(name);
  }

  @Get(':name/raw')
  rawHtml(@Param('name') name: string) {
    return this.templateService.getRawHtml(name);
  }
}
