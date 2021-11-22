export function getSignSection(sign?: string) {
  return `
<section style="page-break-before: always; margin-top: 144px;">
    <div style="display: flex; flex-direction: column">
        <div style="display: flex; margin-bottom: 24px">
            <div style="width: 18px; height: 18px; border: 2px solid black; margin-right: 8px;"></div>
            I acknowledge that I have received the Survey Status Report
        </div>
        <div style="display: flex;">
            <div style="width: 18px; height: 18px; border: 2px solid black; margin-right: 8px;"></div>
            I hereby take notice of the results of today's audit
        </div>
    </div>
    <table style="margin-top: ${sign ? '0px' : '110px'};">
        <tr>
            <td>
            </td>
            <td>
            </td>
            <td>
                ${Boolean(sign) ? `<img src=${sign} height="128px" />` : ''}
            </td>
        </tr>
        <tr>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                DATE, CITY
            </td>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                FIRST NAME LAST NAME
            </td>
            <td>
                <hr style="width: 294px; height: 2px; background-color: black">
                SIGNATURE
            </td>
        </tr>
    </table>
</section>
`;
}
