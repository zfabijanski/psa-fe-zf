import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFundRiskProfileConfig } from "models/common";
import { RootState } from "AppStore";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { api, ApiError } from "utils/api";
import { showModal } from "slices/modal";
import { newErrorModal } from "utils/confirmModalFactory";

type State = {
  loaded: boolean;
  items: IFundRiskProfileConfig[];
};

const initialState: State = {
  loaded: false,
  items: [],
};

export const fundRiskProfilesConfigSlice = createSlice({
  name: "fundRiskProfilesConfig",
  initialState,
  reducers: {
    getFundRiskProfilesConfigRequested(state) {
      state.loaded = false;
      state.items = [];
    },
    getFundRiskProfilesConfigSuccess(
      state,
      action: PayloadAction<IFundRiskProfileConfig[]>
    ) {
      state.loaded = true;
      state.items = action.payload.sort((a, b) => b.risk_level - a.risk_level);
    },
  },
});

const { getFundRiskProfilesConfigRequested, getFundRiskProfilesConfigSuccess } =
  fundRiskProfilesConfigSlice.actions;

export const getFundRiskProfilesConfig = createAsyncThunk(
  "fundRiskProfilesConfig/get",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const fundRiskProfilesConfigLoaded = state.fundRiskProfilesConfig.loaded;

    if (!fundRiskProfilesConfigLoaded) {
      dispatch(getFundRiskProfilesConfigRequested());
      dispatch(showFullscreenSpinner());

      api
        .get<IFundRiskProfileConfig[]>("api/calc/cfg-fund-risk-profiles")
        .then((fundRiskProfilesConfig) => {
          dispatch(getFundRiskProfilesConfigSuccess(fundRiskProfilesConfig));
        })
        .catch((error) => {
          if (error instanceof ApiError) {
            dispatch(showModal(newErrorModal(error.message)));
          }
        })
        .finally(() => {
          dispatch(hideFullscreenSpinner());
        });
    }
  }
);
