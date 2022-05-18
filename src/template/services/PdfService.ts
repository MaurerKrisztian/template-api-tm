import * as pdf from 'html-pdf';

export class PdfService {
  static resolvePdf(html: string) {
    return new Promise((resolve, reject) => {
      pdf.create(html).toBuffer(function (err, buffer) {
        resolve(buffer);
      });
    });
  }
}
