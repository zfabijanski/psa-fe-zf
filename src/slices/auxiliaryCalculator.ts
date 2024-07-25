import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const auxiliaryCalculatorSlice = createSlice({
  name: "auxiliaryCalculator",
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = auxiliaryCalculatorSlice.actions;
