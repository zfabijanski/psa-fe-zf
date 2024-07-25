import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductConfig } from "models/common";
import { signOutSuccess } from "./auth";
import { RootState } from "AppStore";
import { api, ApiError } from "utils/api";
import { newErrorModal } from "utils/confirmModalFactory";
import {
  showFullscreenSpinner,
  hideFullscreenSpinner,
} from "./fullscreenSpinner";
import { showModal } from "./modal";

type State = {
  loaded: boolean;
  items: IProductConfig[];
};

const initialState: State = {
  loaded: false,
  items: [],
};

export const productsConfigSlice = createSlice({
  name: "productsConfig",
  initialState,
  reducers: {
    getProductsConfigSuccess: (
      state,
      action: PayloadAction<IProductConfig[]>
    ) => {
      state.loaded = true;
      state.items = action.payload;
    },
    getProductsConfigRequested: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const { getProductsConfigSuccess, getProductsConfigRequested } =
  productsConfigSlice.actions;

export const getProductsConfig = createAsyncThunk(
  "productCoversLimits/getProductsConfig",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const productsConfigLoaded = state.productsConfig.loaded;

    if (!productsConfigLoaded) {
      dispatch(getProductsConfigRequested());
      dispatch(showFullscreenSpinner());

      api
        .get<IProductConfig[]>("api/calc/cfg-products")
        .then((productsConfig) => {
          dispatch(getProductsConfigSuccess(productsConfig));
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
