import { IDropdownLists, bopDropdownListsSlice } from "./bopDropdownLists";

const { actions, reducer, getInitialState } = bopDropdownListsSlice;

describe("bopDropdownListsSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(getInitialState());
  });

  it("should handle addBopDropdownListsSuccess", () => {
    const actual = reducer(
      getInitialState(),
      actions.addBopDropdownListsSuccess({
        ANSWER_NUM_0_5_LV: [{ value: "1234" }],
      } as IDropdownLists)
    );
    expect(actual).toEqual({
      items: { ANSWER_NUM_0_5_LV: [{ value: "1234" }] },
      status: "Loaded",
    });
  });

  it("should handle requestBopDropdownLists", () => {
    const actual = reducer(
      getInitialState(),
      actions.requestBopDropdownLists()
    );
    expect(actual).toEqual({
      ...getInitialState(),
      status: "Fetching",
    });
  });

  it("should handle addBopDropdownListsFailure", () => {
    const actual = reducer(
      getInitialState(),
      actions.addBopDropdownListsFailure()
    );
    expect(actual).toEqual({
      ...getInitialState(),
      status: "Error",
    });
  });
});
