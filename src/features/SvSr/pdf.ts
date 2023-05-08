import html2pdf from 'react-native-html-to-pdf';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {pdfTemplate} from './pdfTemplate';

export async function pdf(
  data: EvaluationSurvey,
  filters: Record<string, boolean>,
  sign?: string,
  partner?: string,
) {
  let options = {
    html: pdfTemplate(data, filters, sign, partner),
    fileName: 'test',
  };
  let file = await html2pdf.convert(options);
  return file.filePath;
}
