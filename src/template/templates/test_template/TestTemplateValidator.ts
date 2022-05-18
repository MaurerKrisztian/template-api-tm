import { TemplateValidatorAbstract } from '../TemplateValidator';
import { IsString } from 'class-validator';

export class TestTemplateValidator extends TemplateValidatorAbstract<ITestTemplateData> {
  constructor() {
    super('test_template');
  }

  async validate(data: ITestTemplateData): Promise<boolean> {
    return this.validateDto(new TestTemplateDataDto(data));
  }

  exampleData(): ITestTemplateData {
    return {
      title: 'test title',
      description: 'This is a test description',
      color: '#DEB887',
    };
  }
}

export interface ITestTemplateData {
  title: string;

  description: string;

  color: string;
}

export class TestTemplateDataDto implements ITestTemplateData {
  @IsString()
  color: string;

  @IsString()
  description: string;

  @IsString()
  title: string;

  constructor(data: ITestTemplateData) {
    Object.assign(this, data);
  }
}
