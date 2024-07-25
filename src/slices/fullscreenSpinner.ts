import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "AppStore";

export type FullScreenSpinnerState = {
  requestedCount: number;
  active: boolean;
};

const initialState: FullScreenSpinnerState = {
  requestedCount: 0,
  active: true, // initial page requests should deactivate the spinner -> App.tsx. Default value avoids a splash of white screen.
};

export const fullscreenSpinnerSlice = createSlice({
  name: "fullscreenSpinner",
  initialState,
  reducers: {
    requestFullscreenSpinnerInstance: (state) => {
      state.requestedCount += 1;
    },
    activateFullscreenSpinnerInstance: (state) => {
      state.active = true;
    },
    unrequestFullscreenSpinnerInstance: (state) => {
      state.requestedCount -= 1;
    },
    deactivateFullscreenSpinnerInstance: (state) => {
      state.active = false;
    },
  },
});

export const isFullscreenSpinnerRequested = createSelector(
  (state: FullScreenSpinnerState) => state.requestedCount,
  (requestedCount) => requestedCount > 0
);

const {
  requestFullscreenSpinnerInstance,
  activateFullscreenSpinnerInstance,
  unrequestFullscreenSpinnerInstance,
  deactivateFullscreenSpinnerInstance,
} = fullscreenSpinnerSlice.actions;

export const showFullscreenSpinner = createAsyncThunk(
  "fullscreenSpinner/show",
  async (_, { dispatch, getState }) => {
    dispatch(requestFullscreenSpinnerInstance());
    setTimeout(() => {
      const state = getState() as RootState;
      if (isFullscreenSpinnerRequested(state.fullscreenSpinner)) {
        dispatch(activateFullscreenSpinnerInstance());
      }
    }, 300);
  }
);

export const hideFullscreenSpinner = createAsyncThunk(
  "fullscreenSpinner/hide",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (isFullscreenSpinnerRequested(state.fullscreenSpinner)) {
      dispatch(unrequestFullscreenSpinnerInstance());
    }

    setTimeout(() => {
      const state = getState() as RootState;
      if (!isFullscreenSpinnerRequested(state.fullscreenSpinner)) {
        dispatch(deactivateFullscreenSpinnerInstance());
      }
    }, 100);
  }
);
