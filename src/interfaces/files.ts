export interface FetchBlobUtilRequest {
  method: string;
  url: string;
  headers?: {[key: string]: string};
  data?: any;
}
