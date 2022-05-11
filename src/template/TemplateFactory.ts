import * as fs from 'fs';
import Handlebars from 'handlebars';
import { ITemplateValidator } from './templates/TemplateValidator';
import { DailyEmailValidator } from './templates/daily_email/DailyEmailValidator';
import { Injectable } from '@nestjs/common';
import { TestTemplateValidator } from './templates/test_template/TestTemplateValidator';

@Injectable()
export class TemplateFactory {
  private readonly validators: ITemplateValidator<any>[] = [
    new DailyEmailValidator(),
    new TestTemplateValidator(),
  ];

  async create(templateName: string, data: any) {
    const validator: ITemplateValidator<any> = this.findValidator(templateName);
    await validator.validate(data);
    console.log(validator.getDir());
    const html = this.getHtml(templateName, validator.getDir());
    const template = Handlebars.compile(html);
    return template({ data: data });
  }

  async createWithExample(templateName: string) {
    const validator: ITemplateValidator<any> = this.findValidator(templateName);
    await validator.validate(validator.exampleData());
    console.log(validator.getDir());
    const html = this.getHtml(templateName, validator.getDir());
    const template = Handlebars.compile(html);
    return template({ data: validator.exampleData() });
  }

  getHtml(templateName: string, dir: string): string {
    const htmlPath = `${dir}/${templateName}.handlebars`;
    try {
      const html = fs.readFileSync(htmlPath).toString();
      return html;
    } catch (e) {
      console.log(e);
      throw new Error(
        `Template: ${templateName} not found in path: ${htmlPath}`,
      );
    }

    // const css = fs
    //   .readFileSync(`./src/template/templates/${name}/${name}.css`)
    //   .toString();
  }

  findValidator(templateName: string): ITemplateValidator<any> {
    const validator = this.validators.find((validator) => {
      return validator.isAccept(templateName);
    });
    if (!validator) {
      throw new Error('validator not found with name: ' + templateName);
    }
    return validator;
  }

  getAllTemplates() {
    return this.validators.map((validator) => {
      return validator.TEMPLATE_NAME;
    });
  }

  getValidators() {
    return this.validators;
  }
}
