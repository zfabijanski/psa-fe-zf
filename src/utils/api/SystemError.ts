import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export class SystemError extends Error implements AxiosError {
  public readonly code?: string;
  public readonly config: AxiosRequestConfig;
  public readonly message: string;
  public readonly name: string;
  public readonly request: AxiosRequestConfig;
  public readonly response?: AxiosResponse;
  public readonly stack?: string;
  public readonly isAxiosError: boolean;
  public readonly toJSON: () => object;

  constructor(public systemError: AxiosError) {
    super(systemError.message);
    this.code = systemError.code;
    this.config = systemError.config;
    this.message = systemError.message;
    this.name = systemError.name;
    this.request = systemError.request;
    this.response = systemError.response;
    this.stack = systemError.stack;
    this.isAxiosError = systemError.isAxiosError;
    this.toJSON = systemError.toJSON;
  }
}
