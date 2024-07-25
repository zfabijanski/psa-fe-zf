import { AnyAction } from "@reduxjs/toolkit";
import {
  fullscreenSpinnerSlice,
  isFullscreenSpinnerRequested,
} from "./fullscreenSpinner";

const { actions, getInitialState, reducer } = fullscreenSpinnerSlice;

describe("fullscreenSpinner slice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle RequestFullscreenSpinnerInstance action", () => {
    expect(
      reducer(getInitialState(), actions.requestFullscreenSpinnerInstance())
        .requestedCount
    ).toEqual(1);
  });

  it("should handle ActivateFullscreenSpinnerInstance action", () => {
    expect(
      reducer(getInitialState(), actions.activateFullscreenSpinnerInstance())
        .active
    ).toEqual(true);
  });

  it("should handle UnrequestFullscreenSpinnerInstance action", () => {
    expect(
      reducer(getInitialState(), actions.unrequestFullscreenSpinnerInstance())
        .requestedCount
    ).toEqual(-1);
  });

  it("should handle DeactivateFullscreenSpinnerInstance action", () => {
    expect(
      reducer(getInitialState(), actions.deactivateFullscreenSpinnerInstance())
        .active
    ).toEqual(false);
  });
});

describe("isFullscreenSpinnerRequested selector", () => {
  it("should return true if requestedCount is greater than 0", () => {
    expect(
      isFullscreenSpinnerRequested({
        requestedCount: 1,
        active: false,
      })
    ).toEqual(true);
  });

  it("should return false if requestedCount is equal to 0", () => {
    expect(
      isFullscreenSpinnerRequested({
        requestedCount: 0,
        active: false,
      })
    ).toEqual(false);
  });
});
