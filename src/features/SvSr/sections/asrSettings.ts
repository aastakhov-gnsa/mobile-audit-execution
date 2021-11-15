import {StandardFulfillment, StandardType} from '../../../interfaces/standard';
import {surveyDetails} from '../../../interfaces/survey';
import {grayBackground} from './styles';

export function getASRSettingsSection(filters: Record<string, boolean>) {
  const standardType = Object.values(StandardType)
    .filter(item => filters[item])
    .join('. ');
  const fulfillment = Object.values(StandardFulfillment)
    .filter(item => filters[item])
    .join('. ');
  const details = Object.values(surveyDetails)
    .map(label => {
      return `
<tr>
    <td>${label === 'Public Comments' ? 'Comments' : label}</td>
    <td>${filters[label] ? 'Yes' : 'No'}<td>
</tr>
`;
    })
    .join('');
  return `
<table width="100%" style="margin-top: 24px; page-break-after: always;">
    <tr>
        <td style="${grayBackground}" colspan="2">
            ASR Settings. Display of:
        </td>
    </tr>
    <tr>
        <td>
            Standard Type
        </td>
        <td>
            ${standardType}
        </td>
    </tr>
    <tr>
        <td>
            Standards with fulfillment state
        </td>
        <td>
            ${fulfillment}
        </td>
    </tr>
    ${details}
</table>
`;
}
