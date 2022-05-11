import { ITemplateValidator } from '../TemplateValidator';
import { validate, IsString, ValidateNested, IsArray } from 'class-validator';
import {HttpException, HttpStatus, Logger} from '@nestjs/common';
import { Type } from 'class-transformer';
import * as path from 'path';

export class DailyEmailValidator
  implements ITemplateValidator<IDailyEmailData>
{
  public readonly TEMPLATE_NAME = 'daily_email';
  private readonly logger = new Logger(DailyEmailValidator.name);

  isAccept(templateName: string) {
    return templateName == this.TEMPLATE_NAME;
  }

  async validate(data: IDailyEmailData): Promise<boolean> {
    const errors = await validate(new DailyEmailDataDto(data), { validationError: { target: false } });
    if (errors.length > 0) {
      this.logger.error(
        `[${this.TEMPLATE_NAME}] Validation failed: `,
        errors,
      );

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

  exampleData(): IDailyEmailData {
    return [
      {
        title: 'test',
        startAt: `12:11`,
      },
      {
        title: 'test2',
        startAt: `12:11`,
      },
    ];
  }
}

export type IDailyEmailData = IDailyEmail[];

export interface IDailyEmail {
  title: string;

  startAt: string;
}

export class DailyEmailDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyEmailDto)
  data: DailyEmailDto[] = [];

  constructor(data: IDailyEmailData) {
    for (const d of data) {
      this.data.push(new DailyEmailDto(d));
    }
  }
}

export class DailyEmailDto {
  @IsString()
  title: string;

  @IsString()
  startAt: string;

  constructor(data: DailyEmailDto) {
    Object.assign(this, data);
  }
}
