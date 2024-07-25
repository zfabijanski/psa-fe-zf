import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mapAgentPositionToPositionName } from "../mapper/agent/agent";

export const loginUrl = "/home/login";

export const redirectToAgentPortalLandingPage = () => {
  window.location.pathname = loginUrl;
};

export enum Brand {
  BrandPP = "BRAND_PP",
}

export enum LoginState {
  Success = "SUCCESS",
  Failure = "FAILURE",
}

export interface AuthAgent {
  login: string;
  givenName: string;
  surname: string;
  fullName: string;
  brand: Brand;
  agentNo: string;
  phoneNumber: string;
  email: string;
  roles: string[];
  position: string;
  picturePath?: string;
  pictureApiPath?: string;
  apLink?: string;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/psao/api/auth" }),
  endpoints: (builder) => ({
    init: builder.query<{ loginState: LoginState }, void>({
      query: () => ({
        url: "/init",
        method: "POST",
        responseHandler: (response) =>
          response
            .text()
            .then(() => ({ loginState: LoginState.Success }))
            .catch(() => ({ loginState: LoginState.Failure })),
      }),
    }),
    invalidateOtherSessions: builder.mutation<void, void>({
      query: () => ({
        url: "/invalidateothersessions",
        method: "POST",
        headers: {
          PSAOAuthRenew: "true",
        },
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/session",
        method: "DELETE",
      }),
    }),
    prolongUserSession: builder.mutation<void, void>({
      query: () => "/prolong",
    }),
    getAgent: builder.query<AuthAgent, void>({
      query: () => "/agent",
      transformResponse: ({ response }: { response: AuthAgent }) => ({
        ...response,
        position: mapAgentPositionToPositionName(
          response.brand,
          response.position
        ),
        fullName: `${response.givenName} ${response.surname}`,
        pictureApiPath: `/api/agent/picture?${response.picturePath}`,
      }),
    }),
  }),
});

export const {
  useInitQuery,
  useGetAgentQuery,
  useSignOutMutation,
  useProlongUserSessionMutation,
  useInvalidateOtherSessionsMutation,
  useLazyGetAgentQuery,
} = authApi;

export * from "./auth.thunks";
