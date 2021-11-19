import {Status} from './common';

export interface Survey {
  auditManager: string
  auditNumber: string;
  auditor: string;
  auditNote: string
  auditDate: string
  id: string;
  companyId: string;
  number: string;
  outletAddress: string;
  country: string;
  legalName: string;
  outletId: string;
  outletNumber: number,
  outletInfo: string;
  outletName: string;
  outletType: string
  outletStreet: string
  outletZipcode: string
  outletCity: string
  plannedDate: string;
  receivingEntityConcatName: string;
  resultCd: Status;
  services: DaimlerService[];
  statusCd: Status;
}

export const surveyDetails = {
  auditNote: 'Audit Note',
  additionalInfoAndDocuments:
    'Additional information for auditor and required documents',
  clusterStatistic: 'Cluster Statistic',
  logo: 'Daimler Logo',
  description: "Description Standards/MC's",
  weightedFulfillment: 'Weighted Fulfillment',
  servicesStatistic: 'Services Statistic',
  measurementCriteria: 'Measurement Criteria',
  publicComments: 'Public Comments',
  signature: 'Signature',
};

export interface DaimlerService {
  id: string;
  errors: null;
  vstamp: number;
  auditLineNumber: string;
  productGroup: string;
  brand: string;
  activity: string;
}
