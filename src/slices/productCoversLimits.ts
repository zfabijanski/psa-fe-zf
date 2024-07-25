import { createSlice } from "@reduxjs/toolkit";
import { ICoversLimits } from "models/common";
import { signOutSuccess } from "./auth";
import { mapProductsConfigToProductCoversLimits } from "mapper/productCoversLimits/productCoversLimits";
import {
  getProductsConfigRequested,
  getProductsConfigSuccess,
} from "./productsConfig";

export interface IProductCoversLimits {
  [productGuid: number]: ICoversLimits;
}

type State = {
  loaded: boolean;
  items: IProductCoversLimits;
};

const initialState: State = {
  loaded: false,
  items: {},
};

export const productCoversLimitsSlice = createSlice({
  name: "productCoversLimits",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductsConfigSuccess, (state, action) => {
        state.loaded = true;
        state.items = mapProductsConfigToProductCoversLimits(action.payload);
      })
      .addCase(getProductsConfigRequested, () => initialState)
      .addCase(signOutSuccess, () => initialState);
  },
});
