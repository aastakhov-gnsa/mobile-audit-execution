
import {grayBackground} from './styles';

export function getAdditionalAuditInformation(
    auditor: string,
    auditManager: string,
    auditDate: string,
    auditNote: string,
    showAuditNote: boolean
) {
    const auditNoteBlock = showAuditNote
    ? `
<tr style="height: 40px">
    <td>
        Audit Note
    </td>
    <td>
        ${auditNote}
    </td>
</tr>
    `
    : ''
    return `
<table width="100%" style="margin-top: 24px">
    <tr style="height: 40px">
        <td style="${grayBackground}" colspan="2">
            Additional audit information: 
        </td>
    </tr>
    <tr style="height: 40px">
        <td>
            Auditor(s)
        </td>
        <td>
            ${auditor}
        </td>
    </tr>
    <tr style="height: 40px">
        <td>
            Audit Manager(s)
        </td>
        <td>
            ${auditManager}
        </td>
    </tr>
    <tr style="height: 50px">
        <td>
            Audit date
        </td>
        <td>
            ${auditDate}
        </td>
    </tr>
    ${auditNoteBlock}
</table>
    `
}
