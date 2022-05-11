import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getVersion() {
    return {
      message: `API version: v${
        JSON.parse(readFileSync('package.json').toString()).version
      }`,
      templateList: '/template',
    };
  }
}
