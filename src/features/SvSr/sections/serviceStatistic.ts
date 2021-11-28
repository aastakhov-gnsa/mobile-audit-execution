import {notEvaluatedStatuses, passedStatuses} from '../../../interfaces/common';
import {AuditStandardExecution} from '../../../interfaces/standard';
import {grayBackground, blueBackground} from './styles';
import i18next from 'i18next'

export function getServiceStatistic(standards: AuditStandardExecution[]) {
  const open = standards.filter(item =>
    notEvaluatedStatuses.includes(item.status),
  ).length;
  const evaluated = standards.length - open;
  const openPercentage = Math.round((open / (standards.length || 1)) * 100);
  const evaluatedYes = standards.filter(item => passedStatuses.includes(item.status!)).length
  const evaluatedNo = evaluated - evaluatedYes

  return `
<table style="border: 2px solid black; border-collapse: collapse; margin-top: 24px; page-break-inside: avoid;" width="100%">
    <tr style="${grayBackground}">
        <td style="border: 2px solid black" colspan="3">
            ${i18next.t("Services statistics")}
        </td>
    </tr>
    <tr style="${blueBackground} text-align: center;">
        <td style="border: 2px solid black" colspan="3">
            ${i18next.t("Number of standards")}
        </td>
    </tr>
    <tr style="text-align: center;">
        <td style="border: 2px solid black" colspan="3">
            ${standards.length}
        </td>
    </tr>
    <tr style="${blueBackground} text-align: center;">
        <td style="border: 2px solid black" colspan="2">
            ${i18next.t("Evaluated")}
        </td>
        <td style="border: 2px solid black">
            ${i18next.t("SvSR Open")}
        </td>
    </tr>
    <tr style="text-align: center;">
        <td colspan="2" style="border: 2px solid black">
            ${evaluated}
        </td>
        <td rowspan="3" style="border: 2px solid black">
            ${open} (${openPercentage} %)
        </td>
    </tr>
    <tr style="${blueBackground} text-align: center;">
        <td style="border: 2px solid black" width="300px">
            ${i18next.t("Evaluated with \"yes\"")}
        </td>
        <td style="border: 2px solid black" width="300px">
            ${i18next.t("Evaluated with \"no\"")}
        </td>
    </tr>
    <tr style="text-align: center;">
        <td style="border: 2px solid black" width="300px">
            ${evaluatedYes}
        </td>
        <td style="border: 2px solid black" width="300px">
            ${evaluatedNo}
        </td>
    </tr>
</table>
`;
}
