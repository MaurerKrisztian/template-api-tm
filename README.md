# tempalte-api-tm

Template microservice. Generate html (email compatible) and pdf from the given template and data. 

### Features:
- fill html templates with data
- convert html css to inline css for emails
- pdf creation form template with data (get buffer / stream)

### Add template:
1. In /src/templates/template create a new forlder with {templateName}
2. Add a {templateName}.handlebars file (template)
    1. Your html \<style>  will be replaced with inline css because this is the only way it will work with emails
3. Add a Validator class to {templateName} folder (extend TemplateValidatorAbstract<YourTemplateData> - implement the validate(data: YourTemplateData) and exampleData(): YourTemplateData)
4. Add the validator to TemplateFactory validators[]
5. Done. You can see the generated links in the GET /template root, You can get the template as: html string, pdf buffer, pdf stream. Experiment and test with  the playground link.

Demo: https://template.mytaskplan.me/template
