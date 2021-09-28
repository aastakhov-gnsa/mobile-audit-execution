import {MultiValue} from './survey';

type AnyData = Partial<
  Record<
    string,
    string | number | MultiValue[] | OverruleComment | StandardQuestion[]
  >
>;

export interface AuditStandardExecution extends AnyData {
  id: string;
  vstamp: number;
  attachedComment?: string;
  checkpoint?: string;
  commentType?: string;
  files?: MultiValue[];
  overruleComment?: OverruleComment;
  questionDTOList?: StandardQuestion[];
  refineComment?: string;
  services?: MultiValue[];
  standardName?: string;
  standardNumber?: string;
  standardText?: string;
  standardType?: string;
  status?: string;
  statusIconType?: string;
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
    resultCd: string;
  }>;
  mcAuditType: string;
  mcAuditCheckpoint: string;
  options: MultiValue[];
  attachedComment: string;
  commentType: 'Internal' | 'External';
  resultCd: string;
  files: MultiValue[];
  isOptionsPresent: boolean;
}

export interface OverruleComment {
  value: string;
  overruledHint: string;
}
