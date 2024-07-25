import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum StartSlide {
  "BasicInfo" = 0,
  "ConsultantWorkModel" = 10,
  "PrudentialProducts" = 13,
  "CommissionSystem" = 19,
  "EApp" = 31,
}

const initialState = {
  slideId: StartSlide.BasicInfo,
};

export const businessWithPrudentialSlice = createSlice({
  name: "businessWithPrudential",
  initialState,
  reducers: {
    setStartSlide(state, action: PayloadAction<StartSlide>) {
      state.slideId = action.payload;
    },
  },
});

export const { setStartSlide } = businessWithPrudentialSlice.actions;
