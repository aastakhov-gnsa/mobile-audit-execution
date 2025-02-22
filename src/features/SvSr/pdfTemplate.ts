import {EvaluationSurvey} from '../../interfaces/evaluation';
import {surveyDetails} from '../../interfaces/survey';
import {dtLogo} from './dtLogo';
import {mbIconLogo} from './mbIconLogo';
import {mbTextLogo} from './mbTextLogo';
import {getASRSettingsSection} from './sections/asrSettings';
import {getClusterStatistic} from './sections/clusterStatistic';
import {getServiceStatistic} from './sections/serviceStatistic';
import {grayBackground} from './sections/styles';
import {getWeightedFulfillment} from './sections/weightedFulfillment';
import {getQuestionsSection} from './sections/questionsSection';
import {getSignSection} from './sections/signSection';
import {getOnlyUpperCase, getServiceLabel} from '../../utils/daimlerService';
import {getAdditionalAuditInformation} from './sections/additionalAuditInformation';
import {getServicesOverview} from './sections/servicesOverview';
import {getClusterOverview} from './sections/clusterOverview';
import {
  AuditStandardExecution,
  StandardFulfillment,
  StandardType,
} from '../../interfaces/standard';
import {
  failedStatuses,
  notEvaluatedStatuses,
  passedStatuses,
} from '../../interfaces/common';
import localizedFormat from '../../utils/date/localizedFormat';

const logoSection = (mb: boolean) =>
  mb
    ? `
<thead>
    <tr style="">
        <th style="text-align: left;">
            <div style="border-bottom: solid black 1px; display: flex; justify-content: space-between; align-items: baseline; padding: 27px 56px">
                <img src="${mbTextLogo}" style="height: 10px"/>
                <img src="${mbIconLogo}"/>
            </div> 
        </th>
    </tr>
</thead>
`
    : `
<thead>
    <tr style="">
        <th style="text-align: left;">
           <img src="${dtLogo}" width="200px" style="margin-top: 46px; margin-left: 32px; margin-bottom: 58px;">
        </th>
    </tr>
</thead>
`;

export const pdfTemplate = (
  data: EvaluationSurvey,
  filters: Record<string, boolean>,
  sign?: string,
  partner?: string,
) => {
  const date = new Date();
  const dateString = localizedFormat(date, 'dd MMM yyyy kk:mm');
  return `
<style>
    @page {
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 0pt;
        margin-bottom: 0pt;
        padding-left: 0pt;
        padding-right: 0pt;
        padding-top: 0pt;
        padding-bottom: 0pt;
    }
</style>
<table>
${
  filters[surveyDetails.logo]
    ? logoSection(
        data.services.some(i =>
          ['pc', 'van'].includes(i.productGroup.toLowerCase()),
        ),
      )
    : ''
}
<tbody>
<tr>
<td>
<div style="margin-bottom: 12px">
    ${data.legalName ?? data.companyId}
</div>
<div style="margin-bottom: 12px">
    ${data.outletStreet}
</div>
<div style="margin-bottom: 12px">
    ${data.outletZipcode} ${data.outletCity}
</div>
<div style="margin-bottom: 12px">
    ${data.country}
</div>

<h1 style="margin-top: 48px">Survey Status Report</h1>

Created on ${dateString}
<table width="100%" style="margin-top: 24px">
    <tr>
        <td style="${grayBackground}" colspan="4">
            For the location
        </td>
    </tr>
    <tr>
        <td width="50%" colspan="2">
            Outlet No./ID
        </td>
        <td width="50%" colspan="2">
            ${data.outletId} / ${data.companyId} / ${data.outletNumber}
        </td>
    </tr>
    <tr>
        <td width="50%" colspan="2">
            Outlet Type
        </td>
        <td width="50%" colspan="2">
            ${data.outletType}
        </td>
    </tr>
</table>
${getServicesOverview(data.services, data.resultCd)}
${getClusterOverview(data)}
${getAdditionalAuditInformation(
  data.auditor,
  data.auditManager,
  data.auditDate,
  data.auditNote,
  filters[surveyDetails.auditNote],
)}
${getASRSettingsSection(filters)}
${
  filters[surveyDetails.clusterStatistic]
    ? getClusterStatistic(applyFilters(data.standards, filters))
    : ''
}
<div>
${data.services
  .filter(item => filters[getServiceLabel(item)])
  .map(item => getServiceSection(getServiceLabel(item), data, filters))}
</div>
${
  filters[surveyDetails.signature]
    ? getSignSection(sign, partner, data.outletCity, date)
    : ''
}
</td>
</tr>
</table>
`;
};

function getServiceSection(
  serviceName: string,
  data: EvaluationSurvey,
  filters: Record<string, boolean>,
) {
  const service = data.services.find(
    item => getServiceLabel(item) === serviceName,
  );
  const serviceStandards = applyFilters(
    data.standards.filter(item => {
      return item.services?.find(i => getServiceLabel(i) === serviceName);
    }),
    filters,
  );

  const productGroupCode = getOnlyUpperCase(service?.productGroup);
  const brandCode = getOnlyUpperCase(service?.brand);
  const activityCode = getOnlyUpperCase(service?.activity);
  const numberCode = service?.auditLineNumber?.substr(3);
  return `<div>
    <table><tr><td></td></tr></table>
    <h2 style="font-size: 24px; margin-top: 24px">${service?.productGroup} ${
    service?.brand
  } ${service?.activity}</h2>
    <h4>${
      data.outletId
    }-${productGroupCode}-${brandCode}-${activityCode}-${numberCode}</h4>
    ${
      filters[surveyDetails.servicesStatistic]
        ? getServiceStatistic(serviceStandards)
        : ''
    }
    ${
      filters[surveyDetails.weightedFulfillment]
        ? getWeightedFulfillment(serviceStandards)
        : ''
    }
    ${
      filters[surveyDetails.measurementCriteria]
        ? getQuestionsSection(serviceStandards, data.outletType, filters)
        : ''
    }
</div>`;
}

function applyFilters(
  standards: AuditStandardExecution[],
  filters: Record<string, boolean>,
) {
  return standards
    ?.filter(item => {
      if (!filters[StandardType.MUST]) {
        return item.standardType !== StandardType.MUST;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardType.BASIC_BONUS]) {
        return item.standardType !== StandardType.BASIC_BONUS;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardType.RECOMMENDED]) {
        return item.standardType !== StandardType.RECOMMENDED;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardType.AWARDED_BONUS]) {
        return item.standardType !== StandardType.AWARDED_BONUS;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardFulfillment.FAILED]) {
        return failedStatuses.includes(item.status!) === false;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardFulfillment.PASSED]) {
        return passedStatuses.includes(item.status!) === false;
      }
      return true;
    })
    ?.filter(item => {
      if (!filters[StandardFulfillment.OPEN]) {
        return notEvaluatedStatuses.includes(item.status!) === false;
      }
      return true;
    });
}
