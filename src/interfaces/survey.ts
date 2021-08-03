export interface Survey {
  // attachedComment: null
  // auditManagerName: null
  auditNumber: string;
  // auditorId: null
  // auditorName: null
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
  number: string;
  // outletAddress: null
  // outletCountry: null
  // outletId: null
  // outletIdAndCity: null
  // outletInfo: null
  // outletName: null
  // outletStreetAndZipcode: null
  // overruleComment: null
  plannedDate: string;
  // plannedDateForFilterPeriod: null
  // plannedDateRo: null
  receivingEntityConcatName: string;
  // resultCd: null
  // sendingEntityConcatName: null
  services: MultiValue[];
  // smAuditLineList: null
  // statusBgColor: null
  statusCd: string;
  // statusIconType: null
  // surveyClusterType: null
  // surveyExecutionResultCd: null
  // surveyExecutionTitle: null
  // surveyResultColor: null
  // textNumber: null
  // uiPlannedDate: null
}

export interface MultiValue {
  id: string;
  value: string;
  options?: Record<string, string>;
}
