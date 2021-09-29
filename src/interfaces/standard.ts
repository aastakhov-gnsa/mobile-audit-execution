import {MultiValue} from './survey';

type AnyData = Partial<
  Record<
    string,
    | string
    | number
    | MultiValue[]
    | OverruleComment
    | StandardQuestion[]
    | StandardStatus
  >
>;

export interface AuditStandardExecution extends AnyData {
  id: string;
  vstamp: number;
  attachedComment?: string;
  checkpoint?: string;
  commentType?: CommentType;
  files?: MultiValue[];
  overruleComment?: OverruleComment;
  questionDTOList?: StandardQuestion[];
  refineComment?: string;
  services?: MultiValue[];
  standardName?: string;
  standardNumber?: string;
  standardText?: string;
  standardType?: string;
  status?: StandardStatus;
  statusIconType?: string;
  infoForAuditor?: string;
  requiredDocuments?: string;
}

export interface StandardQuestion {
  id: string;
  vstamp: number;
  mcName: string;
  mcDescription: string;
  optionsExecution: Array<{
    value: string;
    hint: string;
    id: string;
    resultCd: ResultCd;
  }>;
  mcAuditType: string;
  mcAuditCheckpoint: string;
  options: MultiValue[];
  attachedComment: string;
  commentType: 'Internal' | 'External';
  resultCd: ResultCd;
  files: MultiValue[];
  isOptionsPresent: boolean;
}

export interface OverruleComment {
  value: string;
  overruledHint: string;
}

export type EmptyStatus = null;

export type ResultCd = 'Passed' | 'Failed' | EmptyStatus;

export type OverruleStatus = 'Passed - Overruled' | 'Failed - Overruled';

export type StandardStatus =
  | ResultCd
  | OverruleStatus
  | 'Open'
  | 'Completed'
  | 'In Progress';

export type CommentType = 'External' | 'Internal';
