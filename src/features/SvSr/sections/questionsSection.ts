import {AuditStandardExecution, StandardQuestion} from '../../../interfaces/standard';
import { surveyDetails } from '../../../interfaces/survey';
import {grayBackground} from './styles';

export function getQuestionsSection(standards: AuditStandardExecution[], outletType: string, filters: Record<string, boolean>) {
    const descriptionBlock = filters[surveyDetails.description]
        ? (item: AuditStandardExecution) => `
<div>
    Description: ${item.standardText}

    ${Boolean(item.infoForAuditor) && `Info for Auditor: ${item.infoForAuditor}`}

    ${Boolean(item.requiredDocuments) && `Additional documents: ${item.requiredDocuments}`}
</div>
` : () => ''

    const rowDescriptionBlock = filters[surveyDetails.description]
        ? (question: StandardQuestion) => `
<div>
    Description: ${question.mcDescription}
</div>
` : () => ''

  const rows = standards
    .map(item => {
      const questions = item.questionDTOList
        ?.map((question, index) => {
          return `
<tr>
    <td style="text-align: center">
        ${index + 1}
    </td>
    <td>
        <div style="font-weight: 700">
            ${question.mcName}
        </div>
        ${rowDescriptionBlock(question)}
    </td>
    <td />
</tr>
`;
        })
        .join('');

      return `
<tr style="${grayBackground}">
    <td style="font-weight: 700; vertical-align: top;" width="25%">
        <div>
            ${item.standardNumber}
        </div> 
        <div>
            ${outletType?.substr(0, 1)}
        </div>
    </td>
    <td style="vertical-align: top;">
        <div style="font-weight: 700; ">
            ${item.standardName} 
        </div>
        ${descriptionBlock(item)}
    </td>
    <td style="font-weight: 400; vertical-align: top;" width="10%">
       ${item.status ?? 'Open'} 
    </td>
</tr>
${questions}
`;
    })
    .join('');
  return `
<table width="100%" style="border-collapse: collapse; margin-top: 16px;">
    <thead>
        <tr>
            <th />
        </tr>
    </thead>
    ${rows}
</table>
`;
}
