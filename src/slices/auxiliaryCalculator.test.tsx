import { AnyAction } from "@reduxjs/toolkit";
import { auxiliaryCalculatorSlice, setOpen } from "./auxiliaryCalculator";

const { reducer: auxiliaryCalculator, getInitialState } =
  auxiliaryCalculatorSlice;

describe("auxiliaryCalculator reducer", () => {
  it("should handle initial state", () => {
    expect(auxiliaryCalculator(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle SET_AUXILIARY_CALCULATOR", () => {
    expect(auxiliaryCalculator(getInitialState(), setOpen(true))).toEqual({
      ...getInitialState(),
      isOpen: true,
    });
  });
});
