import { EvaluationSurvey } from '../../../interfaces/evaluation'
import { getServiceLabel } from '../../../utils/daimlerService';
import {grayBackground} from './styles';

export function getClusterOverview(data: EvaluationSurvey) {
    return `
    <table width="100%" style="margin-top: 24px">
        <tr>
            <td style="${grayBackground}">
                Survey Number
            </td>
            <td style="${grayBackground}">
                Checkpoints
            </td>
            <td style="${grayBackground}">
                Type
            </td>
            <td style="${grayBackground}">
                Service
            </td>
            <td style="${grayBackground}">
                Auditor
            </td>
            <td style="${grayBackground}">
                Status
            </td>
        </tr>
        <tr>
            <td>
                ${data.number}
            </td>
            <td>
                All
            </td>
            <td>
                Regular
            </td>
            <td>
                ${data.services?.map(item => item.activity).join(', ')}
            </td>
            <td>
                ${data.auditor?.split(' ')?.[0]}
            </td>
            <td>
                ${data.resultCd}
            </td>
        </td>
    </table>
        `
}
