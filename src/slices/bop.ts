import {
  CancelStatus,
  IQuestionJSON,
  ParsedAnswers,
  QuestionDataTypeCode,
  SurveyType,
} from "common/features/Survey/Survey.types";
import {
  generateSurveyActions,
  generateSurveyActionType,
  generateSurveyStore,
  generateSurveyThunks,
  GenerateSurveyThunksConfig,
} from "common/features/Survey/store";
import { showModal } from "./modal";
import { ModalTypes } from "models/Modal";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { getCurrentMeetingId, setCurrentMeetingOutdated } from "./meetings";
import { getCurrentAgentNo } from "./auth";
import { api } from "utils/api";
import { redirect } from "utils/router";

export interface IQuestionRecord {
  data_type: QuestionDataTypeCode;
  answer_type_code: string;
  question_value: string;
  answerStatus: ParsedAnswers[];
  cancelStatus: CancelStatus;
  prompt_value: string;
  tooltip: string;
  code: string;
  type: string;
}

export enum BopModalStatus {
  Refuse = "refuse",
  Inform = "inform",
  End = "end",
  Error = "error",
}

export interface IBOP {
  questions: IQuestionRecord[];
  adequacy_id: number | null;
  isQuestionLoading: boolean;
  isDatePickerOpened: boolean;
  isQuestionDeleting: boolean;
  allSteps: number;
  currentStep: number;
}

export interface IQuestionResponse {
  adequacy_id: number;
  adequacy_version: string;
  step_all_no: number;
  step_no: number;
  questionnaire: IQuestionJSON[];
  questionnaire_end: "Y" | "N";
}

export const BopActionType = generateSurveyActionType(SurveyType.bop);

export const actions = generateSurveyActions(SurveyType.bop);
const {
  addNextQuestion,
  deleteApproval,
  deleteLastQuestion,
  markAsApproved,
  resetAnswers,
  resetQuestionnaire,
  setAdequacyID,
  setQuestionDeletingSpinner,
  setQuestionnaireProgress,
  setSpinner,
  toggleAnswerRefusal,
  updateMultiSelectAnswer,
  updateNestedMultiSelectAnswer,
  updateNestedSingleSelectAnswer,
  updateSingleSelectAnswer,
  updateStringAnswer,
} = actions;
export {
  addNextQuestion,
  deleteApproval,
  deleteLastQuestion,
  markAsApproved,
  resetAnswers,
  resetQuestionnaire,
  setAdequacyID,
  setQuestionDeletingSpinner,
  setQuestionnaireProgress,
  setSpinner,
  toggleAnswerRefusal,
  updateMultiSelectAnswer,
  updateNestedMultiSelectAnswer,
  updateNestedSingleSelectAnswer,
  updateSingleSelectAnswer,
  updateStringAnswer,
};

const bopSlice = generateSurveyStore(BopActionType);
export { bopSlice };

const onStopQuestionnaireConfirm: GenerateSurveyThunksConfig["handlers"]["onStopQuestionnaireConfirm"] =
  (dispatch, getState, { getUrl, handleApiErrorFactory }) =>
    dispatch(
      showModal({
        modalIllustration: "alert-double-triangle",
        modalTitleTrKey: "bop.confirm.denyTitle",
        modalType: ModalTypes.danger,
        modalContentTrKey: "bop.message.refuse",
        modalButtons: {
          confirm: {
            // TODO: apply deny styling?
            textTrKey: "confirmWindow.ok",
            onClick: () => {
              dispatch(showFullscreenSpinner());
              const meetingId = getCurrentMeetingId(getState().meetings);
              const agentNo = getCurrentAgentNo(getState().auth);
              const adequacyId = getState().bop.adequacy_id;
              api
                .post(getUrl("meeting-denied"), {
                  i_agent_no: agentNo,
                  i_application_id: "psa-be-main",
                  i_meeting_id: meetingId,
                  i_source_system: "PSAONLINE",
                  io_adequacy_id: adequacyId === 0 ? null : adequacyId,
                })
                .then(() => {
                  dispatch(resetQuestionnaire());
                  dispatch(setCurrentMeetingOutdated());
                  redirect("/meeting");
                })
                .catch(handleApiErrorFactory(dispatch, resetQuestionnaire))
                .finally(() => {
                  dispatch(hideFullscreenSpinner());
                });
            },
          },
        },
      })
    );

const onStopQuestionnaireCancel: GenerateSurveyThunksConfig["handlers"]["onStopQuestionnaireCancel"] =
  (dispatch, _, { shouldToggleCheckbox }) =>
    shouldToggleCheckbox && dispatch(toggleAnswerRefusal());

const {
  getNextQuestion,
  refuseAnswer,
  singleSelectClickHandler,
  startQuestionnaire,
  stopQuestionnaire,
  undoLastQuestion,
  isValid,
} = generateSurveyThunks({
  type: SurveyType.bop,
  actions,
  handlers: {
    onStopQuestionnaireConfirm,
    onStopQuestionnaireCancel,
  },
});

export {
  getNextQuestion,
  refuseAnswer,
  singleSelectClickHandler,
  startQuestionnaire,
  stopQuestionnaire,
  undoLastQuestion,
  isValid,
};
