import { AnyAction } from "@reduxjs/toolkit";
import { modalSlice, showModal, closeModal } from "./modal";

const { reducer: modal, getInitialState } = modalSlice;

describe("modal slice", () => {
  it("should return the initial state", () => {
    expect(modal(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle ShowModal action", () => {
    expect(
      modal(getInitialState(), showModal({ modalTitleTrKey: "test title" }))
    ).toEqual({
      data: {
        modalTitleTrKey: "test title",
      },
    });
  });

  it("should handle CloseModal action", () => {
    expect(modal(getInitialState(), closeModal())).toEqual(getInitialState());
  });
});
