import { AnyAction } from "@reduxjs/toolkit";
import { dictionariesSlice } from "./dictionaries";

const { reducer: dictionaries, getInitialState } = dictionariesSlice;

describe("dictionaries slice", () => {
  it("should return the initial state", () => {
    expect(dictionaries(undefined, {} as AnyAction)).toEqual(getInitialState());
  });
});
