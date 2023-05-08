import {notEvaluatedStatuses} from '../../../interfaces/common';
import {AuditStandardExecution} from '../../../interfaces/standard';
import {grayBackground, blueBackground} from './styles';
import i18next from 'i18next';

export function getClusterStatistic(standards: AuditStandardExecution[]) {
  const open = standards.filter(item =>
    notEvaluatedStatuses.includes(item.status),
  ).length;
  const evaluated = standards.length - open;
  const openPercentage = Math.round((open / (standards.length || 1)) * 100);
  const evaluatedPercentage = Math.round(
    (evaluated / (standards.length || 1)) * 100,
  );
  return `
<table style="border: 2px solid black; border-collapse: collapse; margin-top: 24px;" width="100%">
    <tr style="${grayBackground}">
        <td style="border: 2px solid black" colspan="2">
            ${i18next.t('Cluster statistic for choosen services')}
        </td>
    </tr>
    <tr style="${blueBackground} text-align: center;">
        <td style="border: 2px solid black" colspan="2">
            ${i18next.t('Number of standards')}
        </td>
    </tr>
    <tr style="text-align: center;">
        <td style="border: 2px solid black" colspan="2">
            ${standards.length}
        </td>
    </tr>
    <tr>
        <td width="85%" style="${blueBackground} text-align: center;">
            ${i18next.t('Evaluated')}
        </td>
        <td style="${blueBackground} text-align: center;">
            ${i18next.t('SvSR Open')}
        </td>
    </tr>
    <tr>
        <td width="85%" style="border: 2px solid black; text-align: center;">
            ${evaluated} (${evaluatedPercentage} %)
        </td>
        <td style="border: 2px solid black; text-align: center;">
            ${open} (${openPercentage} %)
        </td>
    </tr>
</table>
`;
}
