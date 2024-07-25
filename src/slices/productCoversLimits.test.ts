import { productCoversLimitsSlice } from "./productCoversLimits";
import { createProductConfig } from "testUtils";
import { signOutSuccess } from "slices/auth";
import {
  getProductsConfigRequested,
  getProductsConfigSuccess,
} from "./productsConfig";
import { AnyAction } from "@reduxjs/toolkit";

const { reducer: productCoversLimits, getInitialState } =
  productCoversLimitsSlice;

describe("productCoversLimits slice", () => {
  it("should return the initial state", () => {
    expect(productCoversLimits(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle GetProductsConfigRequested action", () => {
    expect(
      productCoversLimits(getInitialState(), getProductsConfigRequested())
    ).toEqual({
      loaded: false,
      items: {},
    });
  });

  it("should handle GetProductsConfigSuccess action", () => {
    expect(
      productCoversLimits(
        getInitialState(),
        getProductsConfigSuccess([createProductConfig({ product_guid: 1234 })])
      )
    ).toEqual({
      loaded: true,
      items: {
        1234: {},
      },
    });
  });

  it("should handle sign out success action", () => {
    expect(productCoversLimits(getInitialState(), signOutSuccess())).toEqual({
      loaded: false,
      items: {},
    });
  });
});
