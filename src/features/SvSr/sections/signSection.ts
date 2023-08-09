import localizedFormat from '../../../utils/date/localizedFormat';
import i18next from 'i18next';

export function getSignSection(
  sign?: string,
  partner?: string,
  city?: string,
  date?: Date,
) {
  const checkbox = sign
    ? `<div style="margin-left: 3px;">
        ✓
    </div>`
    : '';
  const displayedDate = date ? localizedFormat(date, 'dd MMM yyyy') : '';
  return `
<section style="page-break-before: always; margin-top: 144px;">
    <div style="display: flex; flex-direction: column">
        <div style="display: flex; margin-bottom: 24px">
            <div style="width: 18px; height: 18px; border: 2px solid black; margin-right: 8px; position: relative;">
                ${checkbox}
            </div>
            ${i18next.t(
              'I acknowledge that I have received the Survey Status Report.',
            )}
        </div>
        <div style="display: flex;">
            <div style="width: 18px; height: 18px; border: 2px solid black; margin-right: 8px;">
                ${checkbox}
            </div>
            ${i18next.t(
              "I herebe take notice of the results of todays' audit.",
            )}
        </div>
    </div>
    <table style="margin-top: ${sign ? '0px' : '110px'};">
        <tr>
            <td style="font-size: 20px; vertical-align: bottom;">
                 ${displayedDate} ${city}
            </td>
            <td style="font-size: 20px; vertical-align: bottom;">
                ${partner || ''}
            </td>
            <td>
                ${sign ? `<img src=${sign} height="128px" />` : ''}
            </td>
        </tr>
        <tr>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                ${i18next.t('DATE, CITY')}
            </td>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                ${i18next.t('FIRST NAME / LAST NAME')}
            </td>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                ${i18next.t('SIGNATURE')}
            </td>
        </tr>
    </table>
</section>
`;
}
