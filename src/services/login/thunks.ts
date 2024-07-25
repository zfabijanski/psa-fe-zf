import { ThunkResult } from "../../AppStore";
import { IApiError, api } from "../../utils/api";

export const initSession =
  (onErrorCallback: (err: IApiError) => void): ThunkResult<Promise<any>> =>
  () => {
    return api.post("/api/auth/init").then((response) => {
      if (response?.error) {
        return onErrorCallback(response.error);
      }

      return response;
    });
  };
