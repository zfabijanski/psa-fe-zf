import { createIllustration } from "testUtils";
import { signOutSuccess } from "slices/auth";
import {
  IllustrationsStatus,
  closeIllustrationPreview,
  getIllustrationsFailure,
  getIllustrationsRequested,
  getIllustrationsSuccess,
  illustrationsSlice,
  removeIllustrationSuccess,
  resetIllustrations,
  previewIllustration,
} from "./illustrations";
import { AnyAction } from "@reduxjs/toolkit";

const { reducer: illustrations, getInitialState } = illustrationsSlice;

describe("illustrations reducer", () => {
  it("should return the initial state", () => {
    expect(illustrations(undefined, {} as AnyAction)).toEqual(
      getInitialState()
    );
  });

  it("should handle GetIllustrationsRequested action", () => {
    expect(
      illustrations(getInitialState(), getIllustrationsRequested())
    ).toEqual({
      ...getInitialState(),
      status: IllustrationsStatus.Loading,
    });
  });

  it("should handle GetIllustrationsSuccess action", () => {
    expect(
      illustrations(
        getInitialState(),
        getIllustrationsSuccess([createIllustration()])
      )
    ).toEqual({
      ...getInitialState(),
      items: [createIllustration()],
      status: IllustrationsStatus.Loaded,
    });
  });

  it("should handle GetIllustrationsFailure action", () => {
    expect(illustrations(getInitialState(), getIllustrationsFailure())).toEqual(
      {
        ...getInitialState(),
        status: IllustrationsStatus.Failure,
      }
    );
  });

  it("should handle OpenIllustrationPreview action", () => {
    expect(illustrations(getInitialState(), previewIllustration(123))).toEqual({
      ...getInitialState(),
      previewedCalculationId: 123,
    });
  });

  it("should handle CloseIllustrationPreview action", () => {
    expect(
      illustrations(
        { ...getInitialState(), previewedCalculationId: 123 },
        closeIllustrationPreview()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });

  it("should handle RemoveIllustrationSuccess action", () => {
    expect(
      illustrations(
        {
          ...getInitialState(),
          items: [
            createIllustration({ pru_calc_calculation_id: 123 }),
            createIllustration({ pru_calc_calculation_id: 456 }),
          ],
        },
        removeIllustrationSuccess(123)
      )
    ).toEqual({
      ...getInitialState(),
      items: [createIllustration({ pru_calc_calculation_id: 456 })],
    });
  });

  it("should handle ResetIllustrations action", () => {
    expect(
      illustrations(
        {
          ...getInitialState(),
          items: [
            createIllustration({ idd_id: 123 }),
            createIllustration({ idd_id: 456 }),
          ],
        },
        resetIllustrations()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });

  it("should handle SignOutSuccess action", () => {
    expect(
      illustrations(
        {
          ...getInitialState(),
          items: [
            createIllustration({ idd_id: 123 }),
            createIllustration({ idd_id: 456 }),
          ],
        },
        signOutSuccess()
      )
    ).toEqual({
      ...getInitialState(),
    });
  });
});
