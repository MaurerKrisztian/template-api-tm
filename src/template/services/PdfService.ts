import * as pdf from 'html-pdf';
import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class PdfService {
  private static readonly logger = new Logger(PdfService.name)
  static resolvePdf(html: string) {
    return new Promise((resolve, reject) => {
      const options = process.env.PHANTOMJS_PATH? { phantomPath: process.env.PHANTOMJS_PATH}: undefined
      this.logger.debug("Pdf create options: ",options)
      pdf.create(html, options).toBuffer(function (err, buffer) {
        resolve(buffer);
      });
    });
  }
}
