import {Status} from './common';

export interface Survey {
  // attachedComment: null
  // auditManagerName: null
  auditNumber: string;
  // auditorId: null
  auditorName: string;
  // auditorNameRo: null
  // checkpointList: null
  // checkpoints: null
  // comment: null
  // commentType: null
  // emptyQuestionsList: false
  // emptyQuestionsListAndIsSplitFlg: false
  // errors: null
  // executionHistory: null
  // factDate: null
  // filterServiceActivity: null
  // filterServiceBrand: null
  // filterServiceProductGroup: null
  // filterSurveyClusterType: null
  id: string;
  // legacyAuditNumber: null
  // networkEntityId: null
  // notEmptyQuestionsListAndIsSplitFlg: false
  companyId: string;
  number: string;
  outletAddress: string;
  outletCountry: string;
  outletId: string;
  outletIdAndCity: string;
  outletInfo: string;
  outletName: string;
  outletStreetAndZipcode: string;
  // overruleComment: null
  plannedDate: string;
  // plannedDateForFilterPeriod: null
  // plannedDateRo: null
  receivingEntityConcatName: string;
  resultCd: Status;
  // sendingEntityConcatName: null
  services: DaimlerService[];
  // smAuditLineList: null
  // statusBgColor: null
  statusCd: Status;
  // statusIconType: null
  // surveyClusterType: null
  // surveyExecutionResultCd: null
  // surveyExecutionTitle: null
  // surveyResultColor: null
  // textNumber: null
  // uiPlannedDate: null
}

export interface DaimlerService {
  id: string;
  errors: null;
  vstamp: number;
  auditLineNumber: string;
  productGroup: string;
  brand: string;
  activity: string;
}
