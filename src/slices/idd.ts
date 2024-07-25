import {
  CancelStatus,
  IQuestionJSON,
  ParsedAnswers,
  QuestionDataTypeCode,
  SurveyType,
} from "common/features/Survey/Survey.types";
import {
  GenerateSurveyThunksConfig,
  generateSurveyActionType,
  generateSurveyActions,
  generateSurveyStore,
  generateSurveyThunks,
} from "common/features/Survey/store";
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
}

export enum IddModalStatus {
  Refuse = "refuse",
  Inform = "inform",
  End = "end",
  Error = "error",
}

export interface IIDD {
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

export const IddActionType = generateSurveyActionType(SurveyType.idd);

export const actions = generateSurveyActions(SurveyType.idd);
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

const iddSlice = generateSurveyStore(IddActionType);
export { iddSlice };

const onStopQuestionnaireConfirm: GenerateSurveyThunksConfig["handlers"]["onStopQuestionnaireCancel"] =
  (dispatch) => {
    dispatch(actions.resetQuestionnaire());
    redirect("/meeting");
  };

const {
  getNextQuestion,
  refuseAnswer,
  singleSelectClickHandler,
  startQuestionnaire,
  stopQuestionnaire,
  undoLastQuestion,
  isValid,
} = generateSurveyThunks({
  type: SurveyType.idd,
  actions,
  handlers: {
    onStopQuestionnaireConfirm,
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
