import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { IMeeting } from "features/Meeting/History/types";
import { signOutSuccess } from "slices/auth";
import { AdditionalField } from "./mail";

export enum MeetingCountsStatus {
  Default = "Default",
  Loaded = "Loaded",
  Failure = "Failure",
}

type State = {
  currentMeetingNo: string;
  meetingsCount: number;
  maxMeetingsCount: number;
  meetingCountsStatus: MeetingCountsStatus;
  isCurrentMeetingOutdated: boolean;
  items: IMeeting[];
};

const initialState: State = {
  currentMeetingNo: "",
  meetingsCount: 0,
  maxMeetingsCount: 0,
  isCurrentMeetingOutdated: false,
  meetingCountsStatus: MeetingCountsStatus.Default,
  items: [],
};

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    addMeetingSuccess(state, action: PayloadAction<IMeeting>) {
      state.items.push(action.payload);
      state.currentMeetingNo = action.payload.meetingNo;
      state.meetingsCount += 1;
    },
    clearCurrentMeeting(state) {
      state.currentMeetingNo = "";
    },
    deleteMeetingSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.meetingNo !== action.payload
      );
      state.meetingsCount -= 1;
    },
    getCurrentMeetingSuccess(state, action: PayloadAction<IMeeting>) {
      state.isCurrentMeetingOutdated = false;
      state.items = state.items.map((item) => {
        if (item.meetingNo === action.payload.meetingNo) {
          return action.payload;
        }
        return item;
      });
    },
    getMeetingsCountsFailure(state) {
      state.meetingCountsStatus = MeetingCountsStatus.Failure;
    },
    getMeetingsCountsSuccess(
      state,
      action: PayloadAction<{ meetingsCount: number; maxMeetingsCount: number }>
    ) {
      state.meetingsCount = action.payload.meetingsCount;
      state.maxMeetingsCount = action.payload.maxMeetingsCount;
      state.meetingCountsStatus = MeetingCountsStatus.Loaded;
    },
    getMeetingsRequest(state) {
      state.isCurrentMeetingOutdated = false;
      state.items = [];
    },
    getMeetingsSuccess(state, action: PayloadAction<IMeeting[]>) {
      state.items = action.payload;
      state.meetingsCount = action.payload.length;
    },
    openMeetingSuccess(state, action: PayloadAction<string>) {
      state.currentMeetingNo = action.payload;
    },
    setCurrentMeetingHaveAdequacy(state, action: PayloadAction<boolean>) {
      state.items = state.items.map((item) => {
        if (item.meetingNo === state.currentMeetingNo) {
          return {
            ...item,
            haveAdequacy: action.payload,
          };
        }
        return item;
      });
    },
    setCurrentMeetingHaveIdd(state, action: PayloadAction<boolean>) {
      state.items = state.items.map((item) => {
        if (item.meetingNo === state.currentMeetingNo) {
          return {
            ...item,
            haveIdd: action.payload,
          };
        }
        return item;
      });
    },
    setCurrentMeetingOutdated(state) {
      state.isCurrentMeetingOutdated = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(signOutSuccess, () => initialState);
  },
});

export const {
  addMeetingSuccess,
  clearCurrentMeeting,
  deleteMeetingSuccess,
  getCurrentMeetingSuccess,
  getMeetingsCountsFailure,
  getMeetingsCountsSuccess,
  getMeetingsRequest,
  getMeetingsSuccess,
  openMeetingSuccess,
  setCurrentMeetingHaveAdequacy,
  setCurrentMeetingHaveIdd,
  setCurrentMeetingOutdated,
} = meetingsSlice.actions;

export * from "./meetings.thunks";

const getMeetingsCount = (state: State) => state.meetingsCount;
const getMaxMeetingsCount = (state: State) => state.maxMeetingsCount;
const getCurrentMeetingNo = (state: State) => state.currentMeetingNo;
const getItems = (state: State) => state.items;
const getMeetingsCountStatus = (state: State) => state.meetingCountsStatus;

export const getCurrentMeeting = createSelector(
  [getCurrentMeetingNo, getItems],
  (currentMeetingNo, items) => {
    return items.find((item) => item.meetingNo === currentMeetingNo);
  }
);

export const canAddMeeting = createSelector(
  [getMeetingsCount, getMaxMeetingsCount, getMeetingsCountStatus],
  (meetingsCount, maxMeetingsCount, meetingsCountsStatus) => {
    if (meetingsCountsStatus === MeetingCountsStatus.Loaded) {
      return meetingsCount < maxMeetingsCount;
    } else {
      return true;
    }
  }
);

export const shouldFetchMeetingsCounts = createSelector(
  [getMeetingsCountStatus],
  (meetingsCountsStatus) => meetingsCountsStatus !== MeetingCountsStatus.Loaded
);

export const getCurrentMeetingClientName = createSelector(
  [getCurrentMeeting],
  (currentMeeting) => {
    return currentMeeting?.name && currentMeeting?.name !== "EMPTY_MEETING"
      ? currentMeeting?.name
      : "";
  }
);

export const getAdditionalMailFieldsFromMeetingStatus = createSelector(
  [getCurrentMeeting],
  (currentMeeting) => {
    const { haveCalculation, haveAdequacy, haveIdd } =
      currentMeeting || ({} as IMeeting);
    const haveAPK = currentMeeting && currentMeeting.statusName.includes("APK");
    if (haveAdequacy || haveIdd) {
      return [
        "lastName",
        "pesel",
        "phone",
        "birthdate",
        "passport",
      ] as AdditionalField[];
    }
    if (haveCalculation || haveAPK) {
      return ["phone"] as AdditionalField[];
    } else {
      return [];
    }
  }
);

export const getCurrentMeetingId = createSelector(
  [getCurrentMeetingNo, getItems],
  (currentMeetingNo, items) =>
    (
      items.find((item) => item.meetingNo === currentMeetingNo) ||
      ({} as IMeeting)
    ).meetingId
);
