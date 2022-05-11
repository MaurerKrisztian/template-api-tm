import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Headers,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  findAll(@Headers() h) {
    return this.templateService.findAll(h?.host );
  }

  @Post(':name')
  findOne(@Param('name') name: string, @Body() body: any) {
    console.log(body.data)
    return this.templateService.findOne(name, body.data);
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
