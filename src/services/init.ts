import { useAppDispatch } from "../AppStore";
import { useLazyGetVersionQuery } from "../utils/version";
import { loadDropdownDictionaries } from "slices/bopDropdownLists";
import { useLazyGetDictionariesQuery } from "slices/dictionaries";
import { useEffect, useState } from "react";
import { useLazyGetAgentQuery, useInitQuery } from "slices/auth";
import { IApiError } from "utils/api";
import { Locale, getTranslations } from "slices/translations";

export const useInit = (): { isLoading?: boolean; error?: IApiError } => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const initResponse = useInitQuery();
  const isLoggedIn = initResponse.isSuccess;

  const [callGetAgent, agentResponse] = useLazyGetAgentQuery();
  const [callGetVersion, getApiVersion] = useLazyGetVersionQuery();
  const [callGetDictionaries, dictionariesResponse] =
    useLazyGetDictionariesQuery();

  useEffect(() => {
    async function load() {
      try {
        if (isLoggedIn) {
          await Promise.all([
            callGetAgent(),
            callGetVersion(),
            callGetDictionaries(),
          ]);

          await dispatch(getTranslations(Locale.PL));
          await dispatch(loadDropdownDictionaries());
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoggedIn) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const responseError = [
    initResponse,
    dictionariesResponse,
    agentResponse,
  ].find((response) => response.error)?.error as unknown as IApiError;

  useEffect(() => {
    if (getApiVersion.data) {
      document.title += `, BE:${getApiVersion.data.version}`;
    }
    if (getApiVersion.error) {
      document.title += ", BE:?version?";
    }
  }, [getApiVersion.data, getApiVersion.error]);

  if (isLoading) {
    return { isLoading: true };
  }

  if (responseError && responseError?.status !== 401) {
    return { error: responseError };
  }

  return {};
};
