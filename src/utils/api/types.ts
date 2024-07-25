export interface IApiError {
  code: string;
  uuid: string;
  status: number;
  exceptions: string[];
  message: string;
}
