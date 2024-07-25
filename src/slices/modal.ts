import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalData } from "models/Modal";

const initialState = {
  data: {} as IModalData,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<IModalData>) {
      state.data = action.payload;
    },
    closeModal(state) {
      state.data = {};
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
