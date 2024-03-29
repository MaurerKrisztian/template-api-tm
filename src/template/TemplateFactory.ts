import * as fs from 'fs';
import Handlebars from 'handlebars';
import { ITemplateValidator } from './templates/TemplateValidator';
import { DailyEmailValidator } from './templates/daily_email/DailyEmailValidator';
import { HttpException, Injectable } from '@nestjs/common';
import { TestTemplateValidator } from './templates/test_template/TestTemplateValidator';
import * as path from 'path';
import { MeetingValidator } from './templates/meeting_template/MeetingValidator';
import pdf from 'html-pdf';
import * as inlineCss from 'inline-css';

@Injectable()
export class TemplateFactory {
  private readonly validators: ITemplateValidator<any>[] = [
    new DailyEmailValidator(),
    new TestTemplateValidator(),
    new MeetingValidator(),
  ];

  async create(templateName: string, data: any) {
    const validator: ITemplateValidator<any> = this.findValidator(templateName);
    await validator.validate(data);
    const html = await this.getHtml(templateName, validator.getDir());
    const template = Handlebars.compile(html);
    const filledTemplate: string = template({ data: data });
    return await inlineCss(filledTemplate, { url: 'filePath' });
  }

  async createWithExample(templateName: string) {
    const validator: ITemplateValidator<any> = this.findValidator(templateName);
    await validator.validate(validator.exampleData());
    const html = await this.getHtml(templateName, validator.getDir());
    const template = Handlebars.compile(html);
    const filledTemplate: string = template({ data: validator.exampleData() });
    return await inlineCss(filledTemplate, { url: 'filePath' });
  }

  async getHtml(templateName: string, dir: string): Promise<string> {
    const htmlPath = path.join(dir, `${templateName}.handlebars`);
    try {
      return fs.readFileSync(htmlPath).toString();
    } catch (e) {
      console.log(e);
      throw new HttpException(
        `Template: ${templateName} not found in path: ${htmlPath}`,
        400,
      );
    }
  }

  findValidator(templateName: string): ITemplateValidator<any> {
    const validator = this.validators.find((validator) => {
      return validator.isAccept(templateName);
    });
    if (!validator) {
      throw new HttpException(
        `[validator] Template not found with name: ${templateName}. Available templates: [${this.getAllTemplates()}]`,
        400,
      );
    }
    return validator;
  }

  getAllTemplates(): string[] {
    return this.validators.map((validator) => {
      return validator.TEMPLATE_NAME;
    });
  }

  getValidators(): ITemplateValidator<any>[] {
    return this.validators;
  }
}
