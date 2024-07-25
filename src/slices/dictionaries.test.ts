import { AnyAction } from "@reduxjs/toolkit";
import {
  dictionariesSlice,
  addDictionariesFailure,
  addDictionariesSuccess,
  Status,
  requestDictionaries,
} from "./dictionaries";

const { reducer: dictionaries, getInitialState } = dictionariesSlice;

describe("dictionaries slice", () => {
  it("should return the initial state", () => {
    expect(dictionaries(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle RequestDictionaries action", () => {
    expect(dictionaries(getInitialState(), requestDictionaries())).toEqual({
      items: {},
      status: Status.Fetching,
    });
  });

  it("should handle AddDictionariesSuccess action", () => {
    expect(
      dictionaries(
        getInitialState(),
        addDictionariesSuccess({
          // @ts-ignore
          test: { id: 123, code: "code", description: "description" },
        })
      )
    ).toEqual({
      items: {
        test: {
          code: "code",
          description: "description",
          id: 123,
        },
      },
      status: Status.Loaded,
    });
  });

  it("should handle AddDictionariesFailure action", () => {
    expect(dictionaries(getInitialState(), addDictionariesFailure())).toEqual({
      status: Status.Error,
      items: {},
    });
  });
});
