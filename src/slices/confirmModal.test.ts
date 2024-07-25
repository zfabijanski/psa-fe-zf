import { AnyAction } from "@reduxjs/toolkit";
import { confirmModalSlice } from "./confirmModal";

const { actions, reducer: confirmModal, getInitialState } = confirmModalSlice;

describe("confirmModal slice", () => {
  it("should return the initial state", () => {
    expect(confirmModal(undefined, {} as AnyAction)).toEqual({ options: null });
  });

  it("should handle OpenConfirmModal action", () => {
    expect(
      confirmModal(
        getInitialState(),
        actions.openConfirmModal({ message: "test message" })
      )
    ).toEqual({
      options: {
        confirmText: {
          id: "confirmWindow.yes",
        },
        message: "test message",
        showBackdrop: true,
        showCancel: true,
        showConfirm: true,
        variant: "Confirm",
      },
    });
  });

  it("should handle CloseConfirmModal action", () => {
    expect(
      confirmModal(
        { options: { message: "test message" } },
        actions.closeConfirmModal()
      )
    ).toEqual({ options: null });
  });
});
