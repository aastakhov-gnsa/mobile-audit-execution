import { Status } from '../../../interfaces/common';
import { DaimlerService } from '../../../interfaces/survey';
import {grayBackground} from './styles';

export function getServicesOverview(services: DaimlerService[], result: Status) {
    const rows = services.map(item => `
<tr>
    <td>
        ${item.brand}
    </td>
    <td>
        ${item.productGroup}
    </td>
    <td>
        ${item.activity}
    </td>
    <td>
        ${result}
    </td>
</tr>
`)
    return `
<table width="100%" style="margin-top: 24px">
    <tr>
        <td style="${grayBackground}">
            Brand
        </td>
        <td style="${grayBackground}">
            Product Group
        </td>
        <td style="${grayBackground}">
            Service
        </td>
        <td style="${grayBackground}">
            Result
        </td>
        </tr>
        ${rows.join('')}
    </tr>
</table>
    `
}
