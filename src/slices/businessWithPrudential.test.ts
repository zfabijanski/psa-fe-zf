import {
  businessWithPrudentialSlice,
  StartSlide,
} from "./businessWithPrudential";

const { actions, reducer } = businessWithPrudentialSlice;

describe("businessWithPrudentialSlice", () => {
  it("should set slideId", () => {
    const state = { slideId: StartSlide.BasicInfo };
    const action = actions.setStartSlide(StartSlide.CommissionSystem);
    const newState = reducer(state, action);
    expect(newState.slideId).toEqual(StartSlide.CommissionSystem);
  });
});
