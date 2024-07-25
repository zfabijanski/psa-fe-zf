import { IApiError } from "./types";

export class ApiError extends Error implements IApiError {
  public readonly code: string;
  public readonly status: number;
  public readonly exceptions: string[];
  public readonly message: string;
  public readonly uuid: string;

  constructor(private apiError: IApiError) {
    super(apiError.message);
    this.code = apiError.code;
    this.status = apiError.status;
    this.exceptions = apiError.exceptions;
    this.message = apiError.message;
    this.uuid = apiError.uuid;
  }
}
