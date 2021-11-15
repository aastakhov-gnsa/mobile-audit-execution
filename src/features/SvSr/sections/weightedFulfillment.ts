import {passedStatuses} from '../../../interfaces/common';
import {AuditStandardExecution} from '../../../interfaces/standard';
import {grayBackground} from './styles';

/**
 * See https://git.daimler.com/GNSA/gnsa-sm-am/blob/bdc89ac0be1a43c1795be989aeeb5cbe4d91f712/sm-source/src/main/java/com/daimler/service/helper/impl/report/datasource/audit/SvSrWeightedFulfillment.java
 *
 * @param standards
 */
export function getWeightedFulfillment(standards: AuditStandardExecution[]) {
  const totalWeight = standards
    .map(item => item.weight ?? 0)
    .reduce((total, next) => total + next, 0);
  const totalResultWeight = standards
    .map(item => {
      if (passedStatuses.includes(item.status!)) {
        return item.weight ?? 0;
      }
      return 0;
    })
    .reduce((total, next) => total + next, 0);
  const rows = standards
    .map(item => {
      const success = passedStatuses.includes(item.status!);
      return `
<tr style="height: 50px">
    <td>
        ${item.standardNumber}
    </td>
    <td>
        ${item.standardName}
    </td>
    <td style="text-align: right">
        ${item.weight ?? 0}
    </td>
    <td style="text-align: left; padding-left: 24px" width="15%">
        ${success ? 'Yes' : 'No'}
    </td>
    <td style="text-align: right; padding-right: 24px">
        ${success ? (item.weight ?? 0) : 0}
    </td>
</tr>
`;
    })
    .join('');
  return `
<h2>Weighted Fulfillment</h2>
<table width="100%" style="border-collapse: collapse; margin-top: 24px;">
    <thead>
        <tr style="${grayBackground} height: 50px">
            <th style="text-align: left; padding-right: 24px;" width="20%">
                Market specific name
            </th>
            <th style="text-align: left" width="*">
                Short title
            </th>
            <th style="text-align: right" width="15%">
                Weighting
            </th>
            <th style="text-align: left; padding-left: 24px" width="15%">
                Success
            </th>
            <th style="text-align: right; padding-right: 24px" width="15%">
                Result
            </th>
        </tr>
    </thead>
    <tbody>
        ${rows}
    </tbody>
    <tfoot>
        <tr style="${grayBackground} height: 50px">
            <th />
            <th />
            <th style="text-align: right">
                ${totalWeight}
            <th>
            <th style="text-align: right; padding-right: 24px">
                ${totalResultWeight}
            </th>
        </tr>
    </tfoot>
</table>
`;
}
