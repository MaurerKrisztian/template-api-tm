import { ITemplateValidator } from '../TemplateValidator';
import { validate, IsString, ValidateNested, IsArray } from 'class-validator';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Type } from 'class-transformer';
import * as path from 'path';

export class TestTemplateValidator
  implements ITemplateValidator<ITestTemplateData>
{
  public readonly TEMPLATE_NAME = 'test_template';
  private readonly logger = new Logger(TestTemplateValidator.name);

  isAccept(templateName: string) {
    return templateName == this.TEMPLATE_NAME;
  }

  async validate(data: ITestTemplateData): Promise<boolean> {
    const errors = await validate(new TestTemplateDataDto(data), {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      this.logger.error(`[${this.TEMPLATE_NAME}] Validation failed: `, errors);

      throw new HttpException(
        `[${this.TEMPLATE_NAME}] Validation failed: ` +
          JSON.stringify(errors, null, 2),
        HttpStatus.BAD_REQUEST,
      );
    }
    return errors.length == 0;
  }

  getDir() {
    return path.resolve(
      __dirname,
      // `${DailyEmailValidator.TEMPLATE_NAME}.handlebars`,
    );
  }

  exampleData(): ITestTemplateData {
    return {
      title: 'test title',
      description: 'This is a test description',
      backgroundColor: '#DEB887',
    };
  }
}

export interface ITestTemplateData {
  title: string;

  description: string;

  backgroundColor: string;
}

export class TestTemplateDataDto implements ITestTemplateData {
  @IsString()
  backgroundColor: string;

  @IsString()
  description: string;

  @IsString()
  title: string;

  constructor(data: ITestTemplateData) {
    Object.assign(this, data);
  }
}
