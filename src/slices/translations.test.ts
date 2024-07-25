import { AnyAction } from "@reduxjs/toolkit";
import { translationsSlice, Locale, Status } from "./translations";

const {
  actions: { addLocaleSuccess },
  reducer: translations,
  getInitialState,
} = translationsSlice;

describe("translations reducer", () => {
  it("should return the initial state", () => {
    expect(translations(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle AddLocaleSuccess action", () => {
    expect(
      translations(
        getInitialState(),
        addLocaleSuccess({
          locale: Locale.PL,
          messages: {
            test: "test",
          },
        })
      )
    ).toEqual({
      ...getInitialState(),
      translations: {
        pl: {
          test: "test",
        },
      },
      status: Status.Loaded,
    });
  });
});
