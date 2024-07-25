import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";

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
    getAgentSuccess(state, action: PayloadAction<IAuthInfo>) {
      state.info = action.payload;
      state.loginFailed = false;
    },
    signOutSuccess(state) {
      state.info = undefined;
    },
    signInFailure(state) {
      state.loginFailed = true;
    },
  },
});

export const getCurrentAgentNo = createSelector(
  (state: AuthState) => state.info,
  (info) => info && info.agentNo
);

export const { getAgentSuccess, signOutSuccess, signInFailure } =
  authSlice.actions;

export * from "./auth.thunks";

// @TODO REMOVE
export enum LoginActionType {
  GetAgentSuccess = "auth/getAgentSuccess",
  SignOutSuccess = "auth/signOutSuccess",
  SignInFailure = "auth/signInFailure",
}
