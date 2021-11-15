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
    <div style="display: flex; margin-top: 110px;">
        <div style="margin-right: 24px">
            <hr style="width: 294px; height: 2px; background-color: black">
            DATE, CITY
        </div>
        <div style="margin-right: 24px">
            <hr style="width: 294px; height: 2px; background-color: black">
            FIRST NAME LAST NAME
        </div>
        <div style="margin-right: 24px;">
            <hr style="width: 294px; height: 2px; background-color: black">
            SIGNATURE
        </div>
    </div>
    
    ${Boolean(sign) ? `<img src=${sign} />` : ''}
</section>
`;
}
