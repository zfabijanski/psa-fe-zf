import { createSlice, createSelector } from "@reduxjs/toolkit";
import { authApi } from "./auth.thunks";

const loginUrl = "/home";

export const redirectToAgentPortalLandingPage = () => {
  window.location.pathname = loginUrl;
};

export enum Brand {
  BrandPP = "BRAND_PP",
}

export interface IAuthInfo {
  login: string;
  givenName: string;
  surname: string;
  brand: Brand;
  agentNo: string;
  phoneNumber: string;
  email: string;
  roles: string[];
  position: string;
  picturePath?: string;
  apLink?: string;
}

export type AuthState = {
  info?: IAuthInfo;
  loginFailed: boolean;
};

export const initialState: AuthState = {
  loginFailed: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutSuccess(state) {
      state.info = undefined;
    },
    signInFailure(state) {
      state.loginFailed = true;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.getAgent.matchFulfilled,
      (state, action) => {
        console.log("@@@@@matcher", action.payload, state);

        state.info = action.payload;
        state.loginFailed = false;
      }
    );
  },
});

export const getCurrentAgentNo = createSelector(
  (state: AuthState) => state.info,
  (info) => info && info.agentNo
);

export const { signOutSuccess, signInFailure } = authSlice.actions;

export * from "./auth.thunks";

// @TODO REMOVE
export enum LoginActionType {
  SignOutSuccess = "auth/signOutSuccess",
  SignInFailure = "auth/signInFailure",
}
