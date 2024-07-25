import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoutePath, redirect } from "utils/router";
import { showModal } from "./modal";
import { isFirstNameValid } from "utils/validationRules";
import { RootState } from "AppStore";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { Dictionary } from "./dictionaries";
import { IMeeting } from "features/Meeting/History/types";
import { ApiError, api } from "utils/api";
import {
  addMeetingSuccess,
  canAddMeeting,
  deleteMeetingSuccess,
  getCurrentMeetingSuccess,
  getMeetingsCountsFailure,
  getMeetingsCountsSuccess,
  getMeetingsRequest,
  getMeetingsSuccess,
  openMeetingSuccess,
  shouldFetchMeetingsCounts,
} from "./meetings";
import {
  maxMeetingsCountExceededModal,
  newErrorModal,
} from "utils/confirmModalFactory";
import moment from "moment";

export interface IGetMeetingsCountResponse {
  agent_id: number;
  login: string;
  cnt: number;
  max_meeting_number: number;
}

export interface IMeetingResponse {
  age?: number;
  agent_id: number;
  birth_date?: number;
  create_date: string;
  last_access_date: string;
  login: string;
  meeting_id: number;
  meeting_no: string;
  name: string;
  state: string;
  status_id: number;
  status_name: string;
  have_adequacy: number;
  have_calculation: number;
  have_idd: number;
}

const apiPrefix = "api/meetings";
const dateFormat = "DD.MM.YYYY";

const transformMeeting = (
  response: IMeetingResponse,
  dictionary: Dictionary
): IMeeting => ({
  age: response.age,
  meetingNo: response.meeting_no,
  meetingId: response.meeting_id,
  lastAccessDate: new Date(response.last_access_date),
  createDate: new Date(response.create_date),
  name: response.name,
  state: response.state,
  statusId: response.status_id,
  statusName: response.status_name,
  statusDescription:
    dictionary[response.status_id] &&
    dictionary[response.status_id].description,
  haveAdequacy: !!response.have_adequacy,
  haveCalculation: !!response.have_calculation,
  haveIdd: !!response.have_idd,
});

export const validateAndAddMeeting = createAsyncThunk(
  "meetings/validateAndAddMeeting",
  async (
    { clientName, redirectTo }: { clientName: string; redirectTo: RoutePath },
    { dispatch }
  ) => {
    if (!clientName.length) {
      dispatch(
        showModal({ modalContentTrKey: "startNewMeeting.emptyName.message" })
      );
    } else if (!isFirstNameValid(clientName)) {
      dispatch(
        showModal({ modalContentTrKey: "startNewMeeting.error.lettersOnly" })
      );
    } else {
      dispatch(addMeeting({ clientName, redirectTo }));
    }
  }
);

export const addMeeting = createAsyncThunk(
  "meetings/addMeeting",
  async (
    { clientName, redirectTo }: { clientName: string; redirectTo: RoutePath },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    dispatch(showFullscreenSpinner());
    const statusesDictionary = state.dictionaries.items.statuses;

    return api
      .post<IMeetingResponse>(`${apiPrefix}/add`, { p_name: clientName })
      .then((meeting) => transformMeeting(meeting, statusesDictionary))
      .then((response) => {
        dispatch(addMeetingSuccess(response));
        redirect(redirectTo);
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 409) {
          dispatch(showModal(maxMeetingsCountExceededModal));
        }
      })
      .finally(() => dispatch(hideFullscreenSpinner()));
  }
);

export const refetchCurrentMeetingIfNeeded = createAsyncThunk(
  "meetings/refetchCurrentMeetingIfNeeded",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.meetings.isCurrentMeetingOutdated) {
      return;
    }

    const statusesDictionary = state.dictionaries.items.statuses;

    dispatch(showFullscreenSpinner());
    api
      .get<IMeetingResponse>(`${apiPrefix}/get`)
      .then((meeting) => transformMeeting(meeting, statusesDictionary))
      .then((meeting) => {
        dispatch(getCurrentMeetingSuccess(meeting));
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
        throw error;
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const getMeetings = createAsyncThunk(
  "meetings/getMeetings",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    dispatch(getMeetingsRequest());
    dispatch(showFullscreenSpinner());

    const statusesDictionary = state.dictionaries.items.statuses;

    api
      .post(`${apiPrefix}/synchronize-and-delete`)
      .then(() => api.get<IMeetingResponse[]>(`${apiPrefix}/getList`))
      .then((res) =>
        res.map((meeting) => transformMeeting(meeting, statusesDictionary))
      )
      .then((meetings: IMeeting[]) => {
        dispatch(getMeetingsSuccess(meetings));
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => {
        dispatch(hideFullscreenSpinner());
      });
  }
);

export const deleteMeeting = createAsyncThunk(
  "meetings/deleteMeeting",
  async (meeting: IMeeting, { dispatch }) => {
    dispatch(
      showModal({
        modalContentTrKey: [
          {
            trKey: "meetingHistory.confirm.deleteMeeting",
            values: {
              name: meeting.name,
              date: moment(meeting.lastAccessDate).format(dateFormat),
            },
          },
        ],
        modalButtons: {
          cancel: { textTrKey: "confirmWindow.back" },
          confirm: {
            textTrKey: "confirmWindow.yes",
            onClick: () => {
              dispatch(showFullscreenSpinner());
              api
                .delete(`${apiPrefix}/remove/${meeting.meetingNo}`)
                .then(() => {
                  dispatch(deleteMeetingSuccess(meeting.meetingNo));
                })
                .catch((error) => {
                  if (error instanceof ApiError) {
                    dispatch(showModal(newErrorModal(error.message)));
                  }
                })
                .finally(() => {
                  dispatch(hideFullscreenSpinner());
                });
            },
          },
        },
      })
    );
  }
);

export const getMeetingsCountsIfNeeded = createAsyncThunk(
  "meetings/getMeetingsCountsIfNeeded",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (!shouldFetchMeetingsCounts(state.meetings)) {
      return Promise.resolve();
    }

    return api
      .get<IGetMeetingsCountResponse>(`${apiPrefix}/count`)
      .then((response) =>
        dispatch(
          getMeetingsCountsSuccess({
            meetingsCount: Number(response.cnt),
            maxMeetingsCount: Number(response.max_meeting_number),
          })
        )
      )
      .catch(() => {
        dispatch(getMeetingsCountsFailure());
      });
  }
);

export const getMeetingsCountsIAndWarnIfNeeded = createAsyncThunk(
  "meetings/getMeetingsCountsIAndWarnIfNeeded",
  async (_, { dispatch, getState }) => {
    dispatch(showFullscreenSpinner());
    dispatch(getMeetingsCountsIfNeeded()).then(() => {
      const state = getState() as RootState;
      dispatch(hideFullscreenSpinner());
      if (!canAddMeeting(state.meetings)) {
        dispatch(
          showModal({
            ...maxMeetingsCountExceededModal,
            modalButtons: {
              confirm: maxMeetingsCountExceededModal.modalButtons.confirm,
            },
          })
        );
      }
    });
  }
);

export const openMeeting = createAsyncThunk(
  "meetings/openMeeting",
  async (meeting: IMeeting, { dispatch }) => {
    if (meeting.state === "Aktualne") {
      const meetingDate = moment(meeting.lastAccessDate).format(dateFormat);

      dispatch(
        showModal({
          modalContentTrKey: [
            {
              trKey: "meetingHistory.confirm.loadMeeting",
              values: {
                name: meeting.name,
                date: meetingDate,
              },
            },
          ],
          modalButtons: {
            cancel: { textTrKey: "confirmWindow.back" },
            confirm: {
              textTrKey: "confirmWindow.yes",
              onClick: () => {
                dispatch(showFullscreenSpinner());
                api
                  .get(`${apiPrefix}/open/${meeting.meetingNo}`)
                  .then(() => {
                    dispatch(
                      showModal({
                        modalContentTrKey: [
                          {
                            trKey: "meetingHistory.info.meetingLoaded",
                            values: {
                              name: meeting.name,
                              date: meetingDate,
                            },
                          },
                        ],
                        modalButtons: {
                          confirm: {
                            textTrKey: "modal.ok",
                            onClick: () => {
                              dispatch(openMeetingSuccess(meeting.meetingNo));
                              redirect("/meeting");
                            },
                          },
                        },
                      })
                    );
                  })
                  .catch((error) => {
                    if (error instanceof ApiError) {
                      dispatch(showModal(newErrorModal(error.message)));
                    }
                  })
                  .finally(() => dispatch(hideFullscreenSpinner()));
              },
            },
          },
        })
      );
    } else {
      dispatch(
        showModal({ modalContentTrKey: "meetingHistory.error.sysUpdate" })
      );
    }
  }
);

export const clearUnillustratedCalculationsRequest = createAsyncThunk(
  "meetings/clearUnillustratedCalculationsRequest",
  async (_, { dispatch }) => {
    return api.delete(`${apiPrefix}/clear`, { data: {} }).catch((error) => {
      if (error instanceof ApiError) {
        dispatch(showModal(newErrorModal(error.message)));
      }
    });
  }
);

// TODO: Remove after fixing meeting status update in BE
export const forceCurrentMeetingStatusUpdate = createAsyncThunk(
  "meetings/forceCurrentMeetingStatusUpdate",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    return api
      .get(`api/meetings/open/${state.meetings.currentMeetingNo}`)
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      });
  }
);
