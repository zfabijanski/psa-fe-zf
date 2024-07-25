import { AnyAction } from "@reduxjs/toolkit";
import { ProductsStatus, productsSlice } from "./products";
import { signOutSuccess } from "slices/auth";

const {
  actions: {
    getProductsRequested,
    getProductsSuccess,
    setProductsFailure,
    setActiveProduct,
    clearActiveProduct,
    resetProducts,
    setEappProducts,
  },
  reducer: products,
  getInitialState,
} = productsSlice;

describe("products slice", () => {
  it("should return the initial state", () => {
    expect(products(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle GetProductsRequested action", () => {
    expect(products(getInitialState(), getProductsRequested())).toEqual({
      ...getInitialState(),
      status: ProductsStatus.Loading,
    });
  });

  it("should handle GetProductsSuccess action", () => {
    expect(products(getInitialState(), getProductsSuccess([]))).toEqual({
      ...getInitialState(),
      status: ProductsStatus.Loaded,
      items: [],
    });
  });

  it("should handle GetProductsFailure action", () => {
    expect(products(getInitialState(), setProductsFailure())).toEqual({
      ...getInitialState(),
      status: ProductsStatus.Failure,
    });
  });

  it("should handle SetActiveProduct action", () => {
    expect(products(getInitialState(), setActiveProduct(123))).toEqual({
      ...getInitialState(),
      activeProductGuid: 123,
    });
  });

  it("should handle ClearActiveProduct action", () => {
    expect(
      products(
        { ...getInitialState(), activeProductGuid: 123 },
        clearActiveProduct()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });

  it("should handle ResetProducts action", () => {
    expect(
      products(
        { ...getInitialState(), status: ProductsStatus.Failure },
        resetProducts()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });

  it("should handle SetEappProducts action", () => {
    expect(products(getInitialState(), setEappProducts([123]))).toEqual({
      ...getInitialState(),
      eappProducts: [123],
    });
  });

  it("should handle SignOutSuccess action", () => {
    expect(
      products(
        { ...getInitialState(), status: ProductsStatus.Failure },
        signOutSuccess()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });
});
