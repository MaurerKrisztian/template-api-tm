import * as path from 'path';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { validate, IsString, ValidateNested, IsArray } from 'class-validator';

export interface ITemplateValidator<TemplateData> {
  TEMPLATE_NAME: string;

  isAccept(templateName: string);

  validate(data: TemplateData): Promise<boolean>;

  exampleData(): TemplateData;

  getDir(): string;
}

export abstract class TemplateValidatorAbstract<T>
  implements ITemplateValidator<T>
{
  readonly logger = new Logger(TemplateValidatorAbstract.name);

  protected constructor(readonly TEMPLATE_NAME: string) {}

  abstract exampleData(): T;

  getDir(): string {
    return path.resolve(__dirname, this.TEMPLATE_NAME);
  }

  isAccept(templateName: string): boolean {
    return templateName == this.TEMPLATE_NAME;
  }

  abstract validate(data: T): Promise<boolean>;

  async validateDto(dto: T | any): Promise<boolean> {
    const errors = await validate(dto as any, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      this.logger.error(`[${this.TEMPLATE_NAME}] Validation failed: `, errors);

      throw new HttpException(
        `[${this.TEMPLATE_NAME}] Validation failed: ` +
          errors
            .map(
              (err) =>
                `${
                  err.constraints[Object.keys(err.constraints)[0]]
                } - value: ${err.value} `,
            )
            .join(', '),

        HttpStatus.BAD_REQUEST,
      );
    }
    return errors.length == 0;
  }
}
