import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import * as fs from 'fs';
import { TemplateFactory } from './TemplateFactory';

@Injectable()
export class TemplateService {
  constructor(private readonly templateFactory: TemplateFactory) {}

  findAll(host: string) {
    const validators = this.templateFactory.getValidators();

    return validators.map((validator) => {
      return {
        name: validator.TEMPLATE_NAME,
        test: {
          playground: `http://${host}/playground?templateName=${validator.TEMPLATE_NAME}`,
          rawHtml: `http://${host}/template/${validator.TEMPLATE_NAME}/raw`,
          demo: {
            html: `http://${host}/template/${validator.TEMPLATE_NAME}/example`,
            pdfBuffer: `http://${host}/template/${validator.TEMPLATE_NAME}/example?type=pdf_buffer`,
            pdfStream: `http://${host}/template/${validator.TEMPLATE_NAME}/example?type=pdf_stream`,
          },
          data: {
            exampleData: validator.exampleData(),
            exampleDataLink: `http://${host}/template/${validator.TEMPLATE_NAME}/exampleData`,
          },
        },
        links: {
          htmlString: `http://${host}/template/${validator.TEMPLATE_NAME}`,
          pdfBuffer: `http://${host}/template/${validator.TEMPLATE_NAME}?type=pdf_buffer`,
          pdfStream: `http://${host}/template/${validator.TEMPLATE_NAME}?type=pdf_stream`,
          note: 'Usage: Post {link} body: exampleData structure',
        },
      };
    });
  }

  getWithExampleData(templateName: string) {
    return this.templateFactory.createWithExample(templateName);
  }

  findOne(name: string, data: any) {
    return this.templateFactory.create(name, data);
  }

  getExampleDataForTemplate(templateName: string) {
    const validator = this.templateFactory.findValidator(templateName);
    return validator.exampleData();
  }

  getRawHtml(templateName: string) {
    const validator = this.templateFactory.findValidator(templateName);
    console.log(
      validator,
      fs
        .readFileSync(
          `${validator.getDir()}/${validator.TEMPLATE_NAME}.handlebars`,
        )
        .toString(),
    );
    return fs
      .readFileSync(
        `${validator.getDir()}/${validator.TEMPLATE_NAME}.handlebars`,
      )
      .toString();
  }
}
