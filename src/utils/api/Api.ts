import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { Action } from "@reduxjs/toolkit";
import {
  redirectAndInformAboutLoginErrors,
  redirectAndInformAboutMultisession,
  redirectAndInformIfSessionExpired,
  redirectToAgentPortalLandingPage,
} from "slices/auth";
import { showModal } from "slices/modal";
import { ThunkResult } from "../../AppStore";
import {
  newErrorModal,
  noInternetAccessLostDataModal,
  noInternetAccessModal,
} from "../confirmModalFactory";
import { redirect } from "../router";
import { ApiError } from "./ApiError";
import { SystemError } from "./SystemError";
import { IApiError } from "./types";

const mfaUrl = "/home/mfa";

const dispatch = (action: Action | ThunkResult) => {
  import("../../AppStore").then((importedStore) => {
    // @ts-ignore
    importedStore.default.dispatch(action);
  });
};

type IApiResponse<T> =
  | {
      error: IApiError;
      response: null;
    }
  | {
      error: null;
      response: T;
    };

export class Api {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      headers: { Accept: "application/json" },
      baseURL: "/psao",
    });
  }

  public get = <T = any>(
    url: string,
    config?: AxiosRequestConfig,
    serverErrorHandlingDisabled?: boolean
  ) =>
    this.instance
      .get<IApiResponse<T>>(url, config)
      .catch(
        this.handleSystemError(
          url,
          this.handleNetworkErrorWhileReading,
          serverErrorHandlingDisabled
        )
      )
      .then((response) => response.data)
      .then(this.handleResponse);

  public post = <T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
    serverErrorHandlingDisabled?: boolean
  ) =>
    this.instance
      .post<IApiResponse<T>>(url, data, config)
      .catch(
        this.handleSystemError(
          url,
          this.handleNetworkErrorWhileUpdating,
          serverErrorHandlingDisabled
        )
      )
      .then((response) => response.data)
      .then(this.handleResponse);

  public put = <T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
    serverErrorHandlingDisabled?: boolean
  ) =>
    this.instance
      .put<IApiResponse<T>>(url, data, config)
      .catch(
        this.handleSystemError(
          url,
          this.handleNetworkErrorWhileUpdating,
          serverErrorHandlingDisabled
        )
      )
      .then((response) => response.data)
      .then(this.handleResponse);

  public patch = <T extends object>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
    serverErrorHandlingDisabled?: boolean
  ) =>
    this.instance
      .patch<IApiResponse<T>>(url, data, config)
      .catch(
        this.handleSystemError(
          url,
          this.handleNetworkErrorWhileUpdating,
          serverErrorHandlingDisabled
        )
      )
      .then((response) => response.data)
      .then(this.handleResponse);

  public delete = <T = any>(url: string, config?: AxiosRequestConfig) =>
    this.instance
      .delete<IApiResponse<T>>(url, config)
      .catch(this.handleSystemError(url, this.handleNetworkErrorWhileUpdating))
      .then((response) => response.data)
      .then(this.handleResponse);

  private handleSystemError =
    (
      url: string,
      networkErrorHandler: () => void,
      serverErrorHandlingDisabled?: boolean
    ) =>
    (error: AxiosError) => {
      const systemError = new SystemError(error);
      if (!systemError.response) {
        networkErrorHandler();
      } else {
        const responseStatus = systemError.response.status;

        if (responseStatus === 401) {
          this.handleAuthorizationError(url, systemError.response.headers);
        } else if (responseStatus === 409 && url.includes("/api/auth/init")) {
          window.location.href = mfaUrl;
        } else if (responseStatus === 403) {
          this.handleAccessForbiddenError();
        } else {
          if (!serverErrorHandlingDisabled) {
            this.handleServerError(error);
          }
        }
      }

      return Promise.reject(systemError);
    };

  private handleResponse = <T>(response: IApiResponse<T>) => {
    if (response.error) {
      return Promise.reject(new ApiError(response.error));
    } else {
      return Promise.resolve(response.response);
    }
  };

  private handleNetworkErrorWhileReading = () =>
    dispatch(showModal(noInternetAccessModal));

  private handleNetworkErrorWhileUpdating = () =>
    dispatch(showModal(noInternetAccessLostDataModal));

  private handleServerError = (error: AxiosError) =>
    dispatch(
      showModal(
        newErrorModal(
          `URL: ${error.config.url}, komunikat: ${error.message}`, // TODO - shouldn't this be removed?
          "app.error.internalError",
          () => redirect("/", true)
        )
      )
    );

  private handleAuthorizationError = (
    url: string,
    headers: AxiosRequestHeaders
  ) => {
    if (url.includes("/api/auth/login")) {
      dispatch(redirectAndInformAboutLoginErrors());
    } else if (url.includes("/api/auth/init") && headers.psaomultisess) {
      dispatch(redirectAndInformAboutMultisession());
    } else {
      dispatch(redirectAndInformIfSessionExpired());
    }
  };

  private handleAccessForbiddenError = () => {
    dispatch(
      showModal(
        // TODO: Add message to translations
        newErrorModal("Nie masz dostępu do aplikacji.", undefined, () =>
          redirectToAgentPortalLandingPage()
        )
      )
    );
  };
}
