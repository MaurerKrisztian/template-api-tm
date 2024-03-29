import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Res,
  Query,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { PdfService } from './services/PdfService';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  findAll(@Headers() headers) {
    return this.templateService.findAll(process.env.MY_HOST || headers?.host);
  }

  @Post(':name')
  async findOne(
    @Param('name') name: string,
    @Body() body: any,
    @Res() res: Response,
    @Query('type') type = 'html',
  ) {
    const html = await this.templateService.getHtmlWithData(name, body?.data);
    this.resSender(type, html, res);
  }
  @Get(':name/example')
  async exampleData(
    @Param('name') name: string,
    @Res() res,
    @Query('type') type = 'html',
  ) {
    const html = await this.templateService.getWithExampleData(name);
    this.resSender(type, html, res);
  }

  @Get(':name/exampleData')
  getExampleDataForTemplate(@Param('name') name: string) {
    return this.templateService.getExampleDataForTemplate(name);
  }

  @Get(':name/raw')
  rawHtml(@Param('name') name: string) {
    return this.templateService.getRawHtml(name);
  }

  async resSender(type: string, html: string, res: Response) {
    switch (type) {
      case 'html_string':
        res.send(html);
        break;
      case 'pdf_stream':
        res.setHeader('Content-disposition', 'inline; filename=file.pdf');
        const pdf: any = await PdfService.resolvePdf(html);
        Readable.from(pdf).pipe(res);
        break;
      case 'pdf_buffer':
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.header('Content-disposition', 'attachment; filename=file.pdf');
        try {
          const pdfBuffer: any = await PdfService.resolvePdf(html);
          res.end(pdfBuffer);
        } catch (e) {
          res.send('pdf generation failed ' + JSON.stringify(e)).status(500);
        }
        break;
      default:
        res.send(html);
    }
  }
}
