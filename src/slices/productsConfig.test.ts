import { AnyAction } from "@reduxjs/toolkit";
import {
  productsConfigSlice,
  getProductsConfigSuccess,
  getProductsConfigRequested,
} from "./productsConfig";
import { signOutSuccess } from "slices/auth";
import { createProductConfig } from "testUtils";

const { reducer: productsConfig, getInitialState } = productsConfigSlice;

describe("productsConfig slice", () => {
  it("should return the initial state", () => {
    expect(productsConfig(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle GetProductsConfigRequested action", () => {
    expect(
      productsConfig(getInitialState(), getProductsConfigRequested())
    ).toEqual({
      loaded: false,
      items: [],
    });
  });

  it("should handle GetProductsConfigSuccess action", () => {
    expect(
      productsConfig(
        getInitialState(),
        getProductsConfigSuccess([createProductConfig()])
      )
    ).toEqual({
      loaded: true,
      items: [createProductConfig()],
    });
  });

  it("should handle sign out success action", () => {
    expect(productsConfig(getInitialState(), signOutSuccess())).toEqual({
      loaded: false,
      items: [],
    });
  });
});