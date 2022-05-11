export interface ITemplateValidator<TemplateData> {
  TEMPLATE_NAME: string

  isAccept(templateName: string);

  validate(data: TemplateData): Promise<boolean>;

  exampleData(): TemplateData;

  getDir(): string
}
