import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { TemplateFactory } from './template/TemplateFactory';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly templateFactory: TemplateFactory) {}

  getVersion() {
    return {
      version: JSON.parse(readFileSync('package.json').toString()).version,
      templateList: '/template',
    };
  }

  async validateExampleDatas() {
    const validators = this.templateFactory.getValidators();
    for (const validator of validators) {
      const isValid = await validator.validate(validator.exampleData());
      if (isValid) {
        this.logger.debug(
          `[template example data] ${validator.TEMPLATE_NAME} valid.`,
        );
      } else {
        this.logger.error(
          `[template example data] ${validator.TEMPLATE_NAME} not valid.`,
        );
      }
    }
  }
}
