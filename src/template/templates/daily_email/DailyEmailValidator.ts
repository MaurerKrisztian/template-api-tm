import { TemplateValidatorAbstract } from '../TemplateValidator';
import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class DailyEmailValidator extends TemplateValidatorAbstract<IDailyEmailData> {
  constructor() {
    super('daily_email');
  }

  async validate(data: IDailyEmailData): Promise<boolean> {
    return this.validateDto(new DailyEmailDataDto(data));
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
