import { TemplateValidatorAbstract } from '../TemplateValidator';
import { IsNumber, IsString } from 'class-validator';

export class MeetingValidator extends TemplateValidatorAbstract<IMeetingTemplateData> {
  constructor() {
    super('meeting_template');
  }

  async validate(data: IMeetingTemplateData): Promise<boolean> {
    console.log(data)
    return this.validateDto(new MeetingTemplateDataDto(data));
  }

  exampleData(): IMeetingTemplateData {
    return {
      roomName: 'Test room name',

      memberName: 'D. Joe',

      startAt: 1652530208330,

      meetingLength: 33,

      meetingLink: 'www.examplelink.com',

      memberList: 'James, Mary, Robert',
    };
  }
}

export interface IMeetingTemplateData {
  roomName: string;

  memberName: string;

  startAt: Date | number;

  meetingLength: number;

  meetingLink: string;

  memberList: string;
}

export class MeetingTemplateDataDto implements IMeetingTemplateData {
  constructor(data: IMeetingTemplateData) {
    Object.assign(this, data);
  }

  @IsNumber()
  meetingLength: number;

  @IsString()
  meetingLink: string;

  @IsString()
  memberName: string;

  @IsString()
  roomName: string;

  @IsNumber()
  startAt: Date | number;

  @IsString()
  memberList: string;
}
