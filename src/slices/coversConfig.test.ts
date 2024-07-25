import { AnyAction } from "@reduxjs/toolkit";
import {
  coversConfigSlice,
  getCoversConfigRequested,
  getCoversConfigSuccess,
} from "./coversConfig";

const { reducer: coversConfig, getInitialState } = coversConfigSlice;

describe("coversConfig slice", () => {
  it("should return the initial state", () => {
    expect(coversConfig(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle GetCoversConfigRequested action", () => {
    expect(coversConfig(getInitialState(), getCoversConfigRequested())).toEqual(
      {
        loaded: false,
        items: [],
      }
    );
  });

  it("should handle GetCoversConfigSuccess action", () => {
    expect(
      coversConfig(
        getInitialState(),
        getCoversConfigSuccess([
          {
            cover_categories: [],
            cover_code: "cover_code",
            cover_name: "cover_name",
          },
        ])
      )
    ).toEqual({
      loaded: true,
      items: [
        {
          cover_categories: [],
          cover_code: "cover_code",
          cover_name: "cover_name",
        },
      ],
    });
  });
});
