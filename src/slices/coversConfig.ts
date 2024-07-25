import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signOutSuccess } from "./auth";
import { RootState } from "AppStore";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { ApiError, api } from "utils/api";
import { showModal } from "slices/modal";
import { newErrorModal } from "utils/confirmModalFactory";

export interface ICoverConfig {
  cover_code: string;
  cover_name: string;
  cover_categories: CoverCategory[];
}

export enum CoverCategory {
  Additional = "ADD",
  WOP = "WOP",
  Child = "CHILD",
  Hospital = "HOSPITAL",
  Main = "MAIN",
}

type State = {
  loaded: boolean;
  items: ICoverConfig[];
};

const initialState: State = {
  loaded: false,
  items: [],
};

export const coversConfigSlice = createSlice({
  name: "coversConfig",
  initialState,
  reducers: {
    getCoversConfigRequested(state) {
      state.loaded = false;
      state.items = [];
    },
    getCoversConfigSuccess(state, action: PayloadAction<ICoverConfig[]>) {
      state.loaded = true;
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const { getCoversConfigRequested, getCoversConfigSuccess } =
  coversConfigSlice.actions;

export const getCoversConfig = createAsyncThunk(
  "coversConfig/get",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const coversConfigLoaded = state.coversConfig.loaded;
    if (!coversConfigLoaded) {
      dispatch(getCoversConfigRequested());
      dispatch(showFullscreenSpinner());

      api
        .get<ICoverConfig[]>("api/calc/cfg-covers")
        .then((coversConfig) => {
          dispatch(getCoversConfigSuccess(coversConfig));
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
