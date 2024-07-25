import { AnyAction } from "@reduxjs/toolkit";
import {
  MeetingCountsStatus,
  canAddMeeting,
  getAdditionalMailFieldsFromMeetingStatus,
  getCurrentMeeting,
  getCurrentMeetingClientName,
  getCurrentMeetingId,
  meetingsSlice,
  shouldFetchMeetingsCounts,
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
} from "./meetings";
import { createMeeting } from "testUtils";

const { reducer: meetings, getInitialState } = meetingsSlice;

describe("meetings slice", () => {
  it("should return the initial state", () => {
    expect(meetings(undefined, {} as AnyAction)).toEqual(getInitialState());
  });

  it("should handle GetMeetingsRequest action", () => {
    expect(meetings(getInitialState(), getMeetingsRequest())).toEqual({
      ...getInitialState(),
      items: [],
    });
  });

  it("should handle GetMeetingsSuccess action", () => {
    const meeting = createMeeting();
    expect(meetings(getInitialState(), getMeetingsSuccess([meeting]))).toEqual({
      ...getInitialState(),
      meetingsCount: 1,
      items: [meeting],
    });
  });

  it("should handle AddMeetingSuccess action", () => {
    const meeting = createMeeting();
    expect(meetings(getInitialState(), addMeetingSuccess(meeting))).toEqual({
      ...getInitialState(),
      currentMeetingNo: meeting.meetingNo,
      meetingsCount: 1,
      items: [meeting],
    });
  });

  it("should handle DeleteMeetingSuccess action", () => {
    const meeting = createMeeting();
    expect(
      meetings(
        {
          ...getInitialState(),
          meetingsCount: 2,
          maxMeetingsCount: 2,
          items: [meeting, createMeeting({ meetingNo: "33" })],
        },
        deleteMeetingSuccess(meeting.meetingNo)
      )
    ).toEqual({
      ...getInitialState(),
      maxMeetingsCount: 2,
      meetingsCount: 1,
      items: [],
    });
  });

  it("should handle GetCurrentMeetingSuccess action", () => {
    const meeting = createMeeting();
    expect(
      meetings(getInitialState(), getCurrentMeetingSuccess(meeting))
    ).toEqual({
      ...getInitialState(),
    });
  });

  it("should handle ClearCurrentMeeting action", () => {
    expect(
      meetings(
        { ...getInitialState(), currentMeetingNo: "123" },
        clearCurrentMeeting()
      )
    ).toEqual({
      ...getInitialState(),
      currentMeetingNo: "",
    });
  });

  it("should handle OpenMeetingSuccess action", () => {
    const meeting = createMeeting();
    expect(
      meetings(getInitialState(), openMeetingSuccess(meeting.meetingNo))
    ).toEqual({
      ...getInitialState(),
      currentMeetingNo: meeting.meetingNo,
    });
  });

  it("should handle SetCurrentMeetingOutdated action", () => {
    expect(meetings(getInitialState(), setCurrentMeetingOutdated())).toEqual({
      ...getInitialState(),
      isCurrentMeetingOutdated: true,
    });
  });

  it("should handle SetCurrentMeetingHaveIdd action", () => {
    const meeting = createMeeting();
    expect(
      meetings(
        {
          ...getInitialState(),
          currentMeetingNo: meeting.meetingNo,
          items: [meeting],
        },
        setCurrentMeetingHaveIdd(true)
      )
    ).toEqual({
      ...getInitialState(),
      currentMeetingNo: meeting.meetingNo,
      items: [{ ...meeting, haveIdd: true }],
    });
  });

  it("should handle SetCurrentMeetingHaveAdequacy action", () => {
    const meeting = createMeeting();

    expect(
      meetings(
        {
          ...getInitialState(),
          currentMeetingNo: meeting.meetingNo,
          items: [meeting],
        },
        setCurrentMeetingHaveAdequacy(true)
      )
    ).toEqual({
      ...getInitialState(),
      currentMeetingNo: meeting.meetingNo,
      items: [{ ...meeting, haveAdequacy: true }],
    });
  });

  it("should handle GetMeetingsCountsSuccess action", () => {
    expect(
      meetings(
        getInitialState(),
        getMeetingsCountsSuccess({ meetingsCount: 1, maxMeetingsCount: 2 })
      )
    ).toEqual({
      ...getInitialState(),
      meetingsCount: 1,
      maxMeetingsCount: 2,
      meetingCountsStatus: MeetingCountsStatus.Loaded,
    });
  });

  it("should handle GetMeetingsCountsFailure action", () => {
    expect(meetings(getInitialState(), getMeetingsCountsFailure())).toEqual({
      ...getInitialState(),
      meetingCountsStatus: MeetingCountsStatus.Failure,
    });
  });

  it("should updatate current meeting", () => {
    const meeting = createMeeting();
    const meeting2 = createMeeting({ meetingNo: "123", meetingId: 2 });
    expect(
      meetings(
        { ...getInitialState(), items: [meeting] },
        getCurrentMeetingSuccess(meeting2)
      )
    ).toEqual({
      ...getInitialState(),
      items: [meeting2],
    });
  });
});

describe("meetings selectors", () => {
  it("should return current meeting", () => {
    const meeting = createMeeting();
    expect(
      getCurrentMeeting({
        ...getInitialState(),
        items: [meeting],
        currentMeetingNo: meeting.meetingNo,
      })
    ).toEqual(meeting);
  });

  it("should return current meeting id", () => {
    const meeting = createMeeting();
    expect(
      getCurrentMeetingId({
        ...getInitialState(),
        items: [meeting],
        currentMeetingNo: meeting.meetingNo,
      })
    ).toEqual(meeting.meetingId);
  });

  it("should return current meeting client name", () => {
    const meeting = createMeeting();
    expect(
      getCurrentMeetingClientName({
        ...getInitialState(),
        items: [meeting],
        currentMeetingNo: meeting.meetingNo,
      })
    ).toEqual(meeting.name);
  });

  it("should return true if current meeting is outdated", () => {
    expect(
      canAddMeeting({
        ...getInitialState(),
        isCurrentMeetingOutdated: true,
      })
    ).toEqual(true);
  });

  it("should return true if current meeting is not outdated", () => {
    expect(
      canAddMeeting({
        ...getInitialState(),
        isCurrentMeetingOutdated: false,
      })
    ).toEqual(true);
  });

  it("should return true if meetings counts should be fetched", () => {
    expect(
      shouldFetchMeetingsCounts({
        ...getInitialState(),
        meetingCountsStatus: MeetingCountsStatus.Default,
      })
    ).toEqual(true);
  });

  it("should return false if meetings counts should not be fetched", () => {
    expect(
      shouldFetchMeetingsCounts({
        ...getInitialState(),
        meetingCountsStatus: MeetingCountsStatus.Loaded,
      })
    ).toEqual(false);
  });

  it("should return additional mail fields from meeting status", () => {
    expect(
      getAdditionalMailFieldsFromMeetingStatus({
        ...getInitialState(),
        meetingCountsStatus: MeetingCountsStatus.Loaded,
        meetingsCount: 1,
        maxMeetingsCount: 2,
      })
    ).toEqual([]);
  });

  it("should return empty object if meeting status is not loaded", () => {
    expect(
      getAdditionalMailFieldsFromMeetingStatus({
        ...getInitialState(),
        meetingCountsStatus: MeetingCountsStatus.Default,
        meetingsCount: 1,
        maxMeetingsCount: 2,
      })
    ).toEqual([]);
  });
});
