export interface FetchBlobUtilRequest {
  method?: string;
  url?: string;
  headers?: {[key: string]: string};
  data?: any;
}

export interface FileLoading {
  id: string;
  /**
   * surveyId or questionId
   */
  entityId: string;
  name: string;
  path: string;
  status: FileStatus;
  loadPart?: number;
}

export type FileStatus = 'error' | 'uploading' | 'downloading' | 'success';

export interface FileLoadingState {
  [entityId: string]: FileLoading[];
}
