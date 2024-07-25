import { ThunkResult } from "../AppStore";
import { reloadIfOutdatedVersion, useGetVersionQuery } from "../utils/version";
import { loadDropdownDictionaries } from "slices/bopDropdownLists";
import { useGetDictionariesQuery } from "slices/dictionaries";
import useSWR from "swr";
import { useEffect } from "react";
import { useGetAgentQuery, useInitQuery } from "slices/auth";
import { IApiError } from "utils/api";

export const init = (): ThunkResult => (dispatch) => {
  reloadIfOutdatedVersion();

  return Promise.all([dispatch(loadDropdownDictionaries())]);
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useInit = (): { isLoading?: boolean; error?: IApiError } => {
  const initResponse = useInitQuery();
  const agentResponse = useGetAgentQuery();
  const getApiVersion = useGetVersionQuery();
  const dictionariesResponse = useGetDictionariesQuery();

  const adequacyListValuesResponse = useSWR(
    "/psao/api/adequacy/list-values",
    fetcher
  );

  const isLoading = [
    initResponse,
    dictionariesResponse,
    agentResponse,
    adequacyListValuesResponse,
  ].some((response) => response.isLoading);

  const responseError = [
    initResponse,
    dictionariesResponse,
    agentResponse,
    adequacyListValuesResponse,
  ].find((response) => response.error)?.error;

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
