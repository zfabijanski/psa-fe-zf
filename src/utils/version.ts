import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

interface IWindowWithVersion extends Window {
  loadedVersion?: string;
}

const getCurrentVersion = () =>
  axios
    .get<{ version: string }>(
      `${process.env.PUBLIC_URL}/info.json?${new Date().getTime()}`,
      {
        headers: { Accept: "application/json" },
      }
    )
    .then((response) => response.data)
    .then((data) => data.version);

export const loadCurrentVersion = async () => {
  const version = await getCurrentVersion();
  (window as IWindowWithVersion).loadedVersion = version;
  document.title += `, FE:${version}`;
};

export const reloadIfOutdatedVersion = async () => {
  const version = await getCurrentVersion();
  if ((window as IWindowWithVersion).loadedVersion !== version) {
    window.location.reload();
  }
};

export const setFakeVersion = (version: string) => {
  (window as IWindowWithVersion).loadedVersion = version;
  // tslint:disable-next-line: no-console
  console.log((window as IWindowWithVersion).loadedVersion);
};

export const versionApi = createApi({
  reducerPath: "version",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PUBLIC_URL,
    headers: {
      Accept: "application/json",
    },
  }),
  endpoints: (builder) => ({
    getVersion: builder.query<{ version: string }, void>({
      query: () => `/info.json?${new Date().getTime()}`,
    }),
  }),
});

export const { useGetVersionQuery, useLazyGetVersionQuery } = versionApi;
