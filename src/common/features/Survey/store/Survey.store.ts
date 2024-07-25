import {
  Reducer,
  Action as ReduxActionType,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { RootState, ThunkResult } from "AppStore";
import { closeModal, showModal } from "slices/modal";
import { api, ApiError, SystemError } from "utils/api";
import { redirect } from "utils/router";
import {
  IQuestionRecord,
  ISurveyState,
  SurveyType,
  IAnswerTree,
  isAnswerTree,
  ParsedAnswers,
  CodeTypes,
} from "../Survey.types";
import {
  parseQuestion,
  prepareForReport,
  provideValue,
} from "../components/QuestionTypes/parsers";
import { ModalTypes } from "models/Modal";
import { IReport } from "common/services/types";
import { IQuestionResponse } from "slices/bop";
import { hideFullscreenSpinner } from "slices/fullscreenSpinner";
import { transformStringWithPattern } from "utils/formatters";
import { getProducts } from "slices/products";
import { getIllustrations } from "slices/illustrations";
import {
  setCurrentMeetingHaveIdd,
  setCurrentMeetingHaveAdequacy,
  setCurrentMeetingOutdated,
} from "slices/meetings";
import {
  AdequacyStatus,
  IddReportName,
  ReportName,
} from "features/Products/types";

export const generateSurveyActionType = (type: SurveyType) =>
  ({
    ToggleAnswerRefusal: `@@${type}/toggleAnswerRefusal`,
    ResetAnswerValues: `@@${type}/resetAnswerValues`,
    ResetQuestionnaire: `@@${type}/resetQuestionnaire`,
    UpdateString: `@@${type}/updateString`,
    UpdateMultiSelect: `@@${type}/updateMultiSelect`,
    UpdateSingleSelect: `@@${type}/updateSingleSelect`,
    UpdateNestedSingleSelect: `@@${type}/updateNestedSingleSelect`,
    UpdateNestedMultiSelect: `@@${type}/updateNestedMultiSelect`,
    AddNextQuestion: `@@${type}/addQuestion`,
    SetAdequacyID: `@@${type}/setAdequacyId`,
    SetSpinner: `@@${type}/setSpinner`,
    SetQuestionDeletingSpinner: `@@${type}/setQuestionDeletingSpinner`,
    SetQuestionnaireProgress: `@@${type}/setQuestionnaireProgress`,
    MarkAsApproved: `@@${type}/markAsApproved`,
    DeleteApproval: `@@${type}/deleteApproval`,
    DeleteLastQuestion: `@@${type}/deleteLastQuestion`,
  } as const);

export const generateSurveyActions = (type: SurveyType) => {
  const actions = generateSurveyActionType(type);

  return {
    setQuestionnaireProgress: (currentStep: number, allSteps: number) => ({
      type: actions.SetQuestionnaireProgress,
      payload: {
        allSteps,
        currentStep,
      },
    }),
    deleteLastQuestion: (currentStep: number, allSteps: number) => ({
      type: actions.DeleteLastQuestion,
      payload: {
        currentStep,
        allSteps,
      },
    }),
    markAsApproved: () => ({
      type: actions.MarkAsApproved,
    }),
    deleteApproval: () => ({
      type: actions.DeleteApproval,
    }),
    addNextQuestion: (questionRecord: IQuestionRecord) => ({
      type: actions.AddNextQuestion,
      payload: questionRecord,
    }),
    setQuestionDeletingSpinner: (isQuestionDeleting: boolean) => ({
      type: actions.SetQuestionDeletingSpinner,
      payload: {
        isQuestionDeleting,
      },
    }),
    setSpinner: (isQuestionLoading: boolean) => ({
      type: actions.SetSpinner,
      payload: {
        isQuestionLoading,
      },
    }),
    setAdequacyID: (id: number) => ({
      type: actions.SetAdequacyID,
      payload: {
        id,
      },
    }),
    toggleAnswerRefusal: () => ({
      type: actions.ToggleAnswerRefusal,
    }),
    resetQuestionnaire: () => ({
      type: actions.ResetQuestionnaire,
    }),
    resetAnswers: () => ({
      type: actions.ResetAnswerValues,
    }),
    updateStringAnswer: (answerCode: string, newValue: string) => ({
      type: actions.UpdateString,
      payload: {
        answerCode,
        newValue,
      },
    }),
    updateMultiSelectAnswer: (answerCode: string) => ({
      type: actions.UpdateMultiSelect,
      payload: {
        answerCode,
      },
    }),
    updateSingleSelectAnswer: (answerCode: string) => ({
      type: actions.UpdateSingleSelect,
      payload: {
        answerCode,
      },
    }),
    updateNestedSingleSelectAnswer: (
      answerCode: string,
      parentPath: string[]
    ) => ({
      type: actions.UpdateNestedSingleSelect,
      payload: {
        answerCode,
        parentPath,
      },
    }),
    updateNestedMultiSelectAnswer: (
      answerCode: string,
      parentPath: string[]
    ) => ({
      type: actions.UpdateNestedMultiSelect,
      payload: {
        answerCode,
        parentPath,
      },
    }),
  };
};

type State = ISurveyState;
type Action = ReturnType<
  ReturnType<typeof generateSurveyActions>[keyof ReturnType<
    typeof generateSurveyActions
  >]
>;

export const generateSurveyStore = (
  actionType: ReturnType<typeof generateSurveyActionType>
) => {
  const initialState: ISurveyState = Object.freeze({
    questions: [],
    adequacy_id: null,
    isQuestionLoading: false,
    isQuestionDeleting: false,
    isDatePickerOpened: false,
    allSteps: 0,
    currentStep: 0,
    type: "",
  });

  const reducer: Reducer<State, Action> = (state = initialState, action) => {
    switch (action.type) {
      case actionType.ToggleAnswerRefusal:
        return toggleAnswerRefusal(state);
      case actionType.ResetQuestionnaire:
        return initialState;
      case actionType.ResetAnswerValues:
        return resetAnswerValues(state);
      case actionType.MarkAsApproved:
        return markLastAnswersAsApproved(state);
      case actionType.DeleteApproval:
        return unmarkApproval(state);
      case actionType.SetSpinner:
        return setSpinner(state, action.payload.isQuestionLoading);
      case actionType.SetQuestionDeletingSpinner:
        return setQuestionDeleting(state, action.payload.isQuestionDeleting);
      case actionType.SetQuestionnaireProgress:
        return setQuestionnaireStepProgress(state, action.payload);
      case actionType.SetAdequacyID:
        return setAdequacyID(state, action.payload.id);
      case actionType.UpdateString:
        return updateString(state, action.payload);
      case actionType.UpdateMultiSelect:
        return updateMultiSelect(state, action.payload.answerCode);
      case actionType.UpdateSingleSelect:
        return updateSingleSelect(state, action.payload.answerCode);
      case actionType.UpdateNestedSingleSelect:
        return updateAnswerTree(state, action.payload);
      case actionType.UpdateNestedMultiSelect:
        return updateAnswerTree(state, action.payload);
      case actionType.AddNextQuestion:
        return addNextQuestion(state, action.payload);
      case actionType.DeleteLastQuestion:
        return deleteLastQuestion(state, action.payload);
      default:
        return state;
    }
  };

  const deleteLastQuestion = (
    state: State,
    payload: {
      currentStep: number;
      allSteps: number;
    }
  ) => {
    return {
      ...state,
      questions: state.questions.filter(
        (elt, index) => index !== state.questions.length - 1
      ),
      currentStep: payload.currentStep,
      allSteps: payload.allSteps,
    };
  };

  const setQuestionnaireStepProgress = (
    state: State,
    payload: {
      currentStep: number;
      allSteps: number;
    }
  ) => {
    return {
      ...state,
      ...payload,
    };
  };

  const markLastAnswersAsApproved = (state: State) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: markActiveAnswersAsApprovedRecursively(
              elt.answerStatus
            ),
          };
        }
        return elt;
      }),
    };
  };

  const unmarkApproval = (state: State) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: unmarkApprovalRecursively(elt.answerStatus),
          };
        }
        return elt;
      }),
    };
  };

  const setQuestionDeleting = (state: State, isQuestionDeleting: boolean) => {
    return { ...state, isQuestionDeleting };
  };

  const setSpinner = (state: State, isQuestionLoading: boolean) => {
    return { ...state, isQuestionLoading };
  };

  const setAdequacyID = (state: State, id: number) => {
    return { ...state, adequacy_id: id };
  };

  const addNextQuestion = (state: State, questionRecord: IQuestionRecord) => {
    return {
      ...state,
      questions: [...state.questions, { ...questionRecord }],
    };
  };

  const toggleAnswerRefusal = (state: State) => {
    if (state.questions[state.questions.length - 1].cancelStatus !== null) {
      return {
        ...state,
        questions: state.questions.map((elt, index) => {
          if (index === state.questions.length - 1) {
            return {
              ...elt,
              cancelStatus: elt.cancelStatus && {
                showModal: elt.cancelStatus.showModal,
                id: elt.cancelStatus.id,
                label: elt.cancelStatus.label,
                checked: !elt.cancelStatus.checked,
              },
            };
          }
          return { ...elt };
        }),
      };
    }
    return state;
  };

  const resetAnswerValues = (state: State) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: elt.answerStatus.map((answer) => {
              if (isAnswerTree(answer)) {
                return resetSubtree(answer);
              } else {
                return {
                  ...answer,
                  isActive: false,
                  isApproved: false,
                  value: provideValue("", answer.type),
                };
              }
            }),
          };
        } else {
          return { ...elt };
        }
      }),
    };
  };

  const updateString = (
    state: State,
    payload: {
      answerCode: string;
      newValue: string;
    }
  ) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: [
              ...elt.answerStatus.map((answer) => {
                if (answer.code === payload.answerCode) {
                  return {
                    ...answer,
                    isActive: payload.newValue !== "",
                    value: payload.newValue,
                  };
                } else {
                  return answer;
                }
              }),
            ],
          };
        } else {
          return { ...elt };
        }
      }),
    };
  };

  const updateMultiSelect = (state: State, answerCode: string) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: [
              ...elt.answerStatus.map((answer) => {
                if (answer.code === answerCode) {
                  if (isAnswerTree(answer)) {
                    return answer.isActive
                      ? resetSubtree(answer)
                      : { ...answer, isActive: true };
                  } else {
                    return {
                      ...answer,
                      isActive: !answer.isActive,
                    };
                  }
                }
                return answer;
              }),
            ],
          };
        } else {
          return { ...elt };
        }
      }),
    };
  };

  const updateSingleSelect = (state: State, answerCode: string) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: [
              ...elt.answerStatus.map((answer) => ({
                ...answer,
                isActive: answer.code === answerCode ? !answer.isActive : false,
              })),
            ],
          };
        } else {
          return { ...elt };
        }
      }),
    };
  };

  const updateAnswerTree = (
    state: State,
    payload: {
      parentPath: string[];
      answerCode: string;
    },
    toggle?: boolean
  ) => {
    return {
      ...state,
      questions: state.questions.map((elt, index) => {
        if (index === state.questions.length - 1) {
          return {
            ...elt,
            answerStatus: getUpdatedTree(
              elt.answerStatus as IAnswerTree[],
              payload.parentPath,
              payload.answerCode,
              toggle
            ),
          };
        } else {
          return { ...elt };
        }
      }),
    };
  };

  const resetSubtree = (subtree: IAnswerTree): IAnswerTree => ({
    ...subtree,
    isActive: false,
    isApproved: false,
    subanswers: subtree.subanswers.map(resetSubtree),
  });

  const getUpdatedTree = (
    branch: IAnswerTree[],
    path: string[],
    answerCode: string,
    toggle?: boolean
  ): IAnswerTree[] => {
    type TreeUpdater = (
      parent: IAnswerTree[],
      currentDepth: number
    ) => IAnswerTree[];
    const updateTree: TreeUpdater = (parent, currentDepth) =>
      parent.reduce((acc: IAnswerTree[], node: IAnswerTree) => {
        if (currentDepth < path.length) {
          if (node.code === path[currentDepth]) {
            return [
              ...acc,
              {
                ...node,
                subanswers: updateTree(node.subanswers, currentDepth + 1),
              },
            ];
          } else {
            return [...acc, node];
          }
        } else {
          if (node.code === answerCode) {
            const subtree = node.isActive
              ? resetSubtree(node)
              : { ...node, isActive: true };
            return [...acc, subtree];
          } else {
            return [...acc, toggle ? { ...resetSubtree(node) } : node];
          }
        }
      }, []);

    return updateTree(branch, 0);
  };

  const markActiveAnswersAsApprovedRecursively = (
    answers: ParsedAnswers[]
  ): ParsedAnswers[] => {
    return answers.map((answer: ParsedAnswers) => {
      if (isAnswerTree(answer)) {
        return {
          ...answer,
          isApproved: answer.isActive,
          subanswers: markActiveAnswersAsApprovedRecursively(answer.subanswers),
        };
      }
      return { ...answer, isApproved: answer.isActive };
    });
  };

  const unmarkApprovalRecursively = (
    answers: ParsedAnswers[]
  ): ParsedAnswers[] => {
    return answers.map((answer: ParsedAnswers) => {
      if (isAnswerTree(answer)) {
        return {
          ...answer,
          isApproved: false,
          subanswers: unmarkApprovalRecursively(answer.subanswers),
        };
      }
      return { ...answer, isApproved: false };
    });
  };

  return {
    initialState,
    reducer,
  };
};

// -- Thunks

type GenerateSurveyConfigHandlerExtraParams = {
  shouldToggleCheckbox: boolean;
  getUrl(destination: string): string;
  handleApiErrorFactory(
    dispatch: ThunkDispatch<RootState, undefined, ReduxActionType>,
    callback: Function
  ): (error: ApiError | SystemError) => void;
};

export type GenerateSurveyThunksConfig = {
  type: SurveyType;
  actions: ReturnType<typeof generateSurveyActions>;
  handlers: {
    onStopQuestionnaireConfirm(
      dispatch: ThunkDispatch<RootState, undefined, ReduxActionType<any>>,
      getState: () => RootState,
      extraParams: GenerateSurveyConfigHandlerExtraParams
    ): void;
    onStopQuestionnaireCancel?(
      dispatch: ThunkDispatch<RootState, undefined, ReduxActionType<any>>,
      getState: () => RootState,
      extraParams: GenerateSurveyConfigHandlerExtraParams
    ): void;
  };
};

export const generateSurveyThunks = ({
  type,
  actions,
  handlers,
}: GenerateSurveyThunksConfig) => {
  const getUrl = (destination: string) => {
    const typeParam = {
      [SurveyType.bop]: "adequacy",
      [SurveyType.idd]: "idd",
    };
    return `/api/${typeParam[type]}/${destination}`;
  };
  const surveyUpdateCurrentMeetingActionMap = {
    [SurveyType.bop]: setCurrentMeetingHaveAdequacy,
    [SurveyType.idd]: setCurrentMeetingHaveIdd,
  } as const;

  const handleApiErrorFactory =
    (
      dispatch: ThunkDispatch<RootState, undefined, ReduxActionType<any>>,
      callback: Function
    ) =>
    (error: ApiError | SystemError) => {
      if (!(error instanceof ApiError)) {
        return;
      }

      dispatch(
        showModal({
          modalContentTrKey: "bop.error.callIT",
          modalButtons: {
            confirm: {
              textTrKey: "modal.ok",
              onClick: () => {
                dispatch(callback());
                redirect("/meeting");
              },
            },
          },
        })
      );
    };

  const validateAnswers = (
    report: IReport[],
    question: IQuestionRecord
  ): boolean => {
    let cancelValue = false;
    const { data_type: dataType } = question;
    const result = report.reduce((acc: boolean, elt) => {
      if (elt.quse_anse_map_code === question.cancelStatus?.id) {
        cancelValue = elt.value === "Y";
      } else {
        const { validationPattern } =
          question.answerStatus.find(
            (x) => x.code === elt.quse_anse_map_code
          ) ?? {};

        if (validationPattern) {
          const regex = new RegExp(validationPattern);
          acc = regex.test(elt.value) && elt.value !== "";
        } else if (dataType !== CodeTypes.MultiGroup) {
          if (!acc) {
            acc = elt.value !== "" && elt.value !== "N";
          }
        } else {
          if (acc) {
            acc = elt.value !== "";
          }
        }
      }
      return acc;
    }, dataType === CodeTypes.MultiGroup);
    return result || cancelValue;
  };

  const singleSelectClickHandler =
    (answerCode: string): ThunkResult =>
    (dispatch, getState) => {
      const questions = getState()[type].questions;
      const answers = questions[questions.length - 1].answerStatus;
      const currentAnswer = answers.find(
        (answer) => answer.code === answerCode
      );
      dispatch(actions.updateSingleSelectAnswer(answerCode));
      if (currentAnswer && !currentAnswer.isActive) {
        dispatch(getNextQuestion());
      }
    };

  const stopQuestionnaire =
    (shouldToggleCheckbox: boolean = false): ThunkResult =>
    (dispatch, getState) => {
      dispatch(
        showModal({
          modalIllustration: "alert-double-triangle",
          modalTitleTrKey: "idd.confirm.denyTitle",
          modalType: ModalTypes.danger,
          modalContentTrKey: `${type}.confirm.denyQuestion`,
          modalButtons: {
            cancel: {
              textTrKey: "confirmWindow.back",
              onClick: () =>
                handlers.onStopQuestionnaireCancel?.(dispatch, getState, {
                  shouldToggleCheckbox,
                  getUrl,
                  handleApiErrorFactory,
                }),
            },
            confirm: {
              textTrKey: "confirmWindow.stopAdequacy",
              onClick: () =>
                handlers.onStopQuestionnaireConfirm(dispatch, getState, {
                  shouldToggleCheckbox,
                  getUrl,
                  handleApiErrorFactory,
                }),
            },
          },
        })
      );
    };

  const validateTreeAnswers = (
    answers: ParsedAnswers[],
    isNested: boolean = false
  ): boolean => {
    return answers.reduce((acc: boolean, elt) => {
      if (isAnswerTree(elt)) {
        const hasSubanswers = elt.subanswers.length > 0;
        if (hasSubanswers && elt.isActive) {
          return validateTreeAnswers(elt.subanswers, true);
        } else if (!acc && !hasSubanswers && isNested) {
          return elt.isActive;
        }
      }
      return acc;
    }, false);
  };

  const isValid = (questions: IQuestionRecord[]): boolean => {
    const answers = questions[questions.length - 1];
    if (answers) {
      if (answers.data_type === CodeTypes.Info) {
        return true;
      } else {
        let report: IReport[] = [];
        let nestedValidation = true;
        if (answers.data_type === CodeTypes.Tree) {
          report = prepareForReport(
            answers.answerStatus,
            answers.cancelStatus,
            true
          );
          const activeAnswersWithSubanswers = answers.answerStatus.filter(
            (answer) =>
              isAnswerTree(answer) &&
              answer.subanswers.length > 0 &&
              answer.isActive
          );
          nestedValidation =
            activeAnswersWithSubanswers.length > 0
              ? validateTreeAnswers(activeAnswersWithSubanswers)
              : true;
        } else {
          report = prepareForReport(answers.answerStatus, answers.cancelStatus);
        }
        return validateAnswers(report, answers) && nestedValidation;
      }
    }
    return false;
  };

  const refuseAnswer = (): ThunkResult => (dispatch, getState) => {
    const { cancelStatus } =
      getState()[type].questions[getState()[type].questions.length - 1];
    dispatch(actions.toggleAnswerRefusal());
    if (cancelStatus?.showModal) {
      dispatch(stopQuestionnaire(true));
    } else {
      dispatch(actions.resetAnswers());
    }
  };

  const startQuestionnaire = (): ThunkResult => (dispatch) => {
    dispatch(actions.resetQuestionnaire());

    api
      .post<IQuestionResponse>(getUrl("start"), {
        i_questionnaire_type: type.toUpperCase(),
      })
      .then((res) => {
        dispatch(actions.setAdequacyID(res.adequacy_id));
        dispatch(
          actions.setQuestionnaireProgress(res.step_no, res.step_all_no)
        );

        dispatch(surveyUpdateCurrentMeetingActionMap[type](false));

        return parseQuestion(res.questionnaire[0]);
      })
      .then((parsedData) => {
        dispatch(
          actions.addNextQuestion({
            code: parsedData.code,
            question_value: parsedData.question_value,
            prompt_value: parsedData.prompt_value || "",
            answer_type_code: parsedData.answer_type_code,
            data_type: parsedData.data_type,
            answerStatus: parsedData.answers,
            tooltip: parsedData.tooltip || "",
            cancelStatus: parsedData.answer_cancel && {
              id: parsedData.answer_cancel.quse_anse_map_code,
              label: parsedData.answer_cancel.answer_value,
              checked: parsedData.answer_cancel.default_value,
              showModal: parsedData.answer_cancel.questionnaire_cancel,
            },
            type: parsedData.type,
          })
        );
      })
      .catch(handleApiErrorFactory(dispatch, actions.resetQuestionnaire))
      .finally(() => dispatch(hideFullscreenSpinner()));
  };

  const getNextQuestion = (): ThunkResult => (dispatch, getState) => {
    const isQuestionLoading = getState()[type].isQuestionLoading;
    const isFullScreenSpinnerActive = getState().fullscreenSpinner.active;
    let questions = getState()[type].questions;
    let answers = questions[questions.length - 1];
    if (!isQuestionLoading && !isFullScreenSpinnerActive) {
      if (
        answers.answer_type_code === CodeTypes.All ||
        answers.data_type === CodeTypes.MultiGroup
      ) {
        answers.answerStatus.forEach((elt) => {
          if (elt.type === CodeTypes.String) {
            dispatch(
              actions.updateStringAnswer(
                elt.code,
                transformStringWithPattern(elt.value, elt.text_transform_code)
              )
            );
          }
        });
        questions = getState()[type].questions;
        answers = questions[questions.length - 1];
      }
      const report = prepareForReport(
        answers.answerStatus,
        answers.cancelStatus
      );
      dispatch(actions.setSpinner(true));
      if (isValid(questions)) {
        api
          .post<IQuestionResponse>(getUrl("answer"), {
            i_answers: report,
          })
          .then((res) => {
            if (res.questionnaire?.[0].question_type_code === "CONFIRM") {
              dispatch(
                showModal({
                  modalContentTrKey: "calculator.modal.confirm.content",
                  modalButtons: {
                    confirm: {
                      textTrKey: "modal.ok",
                      onClick: () => {
                        dispatch(closeModal());

                        document.getElementById("page-container")?.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      },
                    },
                  },
                })
              );
            }

            if (res.questionnaire_end === "Y") {
              dispatch(actions.setSpinner(false));
              dispatch(
                showModal({
                  modalIllustration: "illustration-frame-rounded",
                  modalContentTrKey: `${type}.confirm.surveyFinished`,
                  modalButtons: {
                    confirm: {
                      textTrKey: "modal.ok",
                      onClick: () => {
                        Promise.all([
                          dispatch(getProducts()),
                          dispatch(getIllustrations()),
                          dispatch(setCurrentMeetingOutdated()),
                          dispatch(
                            surveyUpdateCurrentMeetingActionMap[type](true)
                          ),
                        ]).then(() => {
                          if (type === SurveyType.idd) {
                            redirect(`/report-idd`, false, {
                              report: IddReportName.IDD,
                            });
                          } else {
                            const {
                              raport_name: reportName,
                              adequacy_status: adequacyStatus,
                            } = getState().products.items[0];
                            if (
                              reportName === ReportName.BOP &&
                              adequacyStatus === AdequacyStatus.Finished
                            ) {
                              redirect(`/report-bop`, false, {
                                report: reportName,
                              });
                            } else {
                              // In case of ended questionnaire but not "finished" BOP ("denied" with no actual report)
                              // we should handle it as interrupted/aborted questionnaire
                              dispatch(
                                surveyUpdateCurrentMeetingActionMap[type](false)
                              );
                              redirect("/meeting");
                            }
                          }
                        });
                      },
                    },
                  },
                  maskClosable: false,
                })
              );
            } else {
              const parsedData = parseQuestion(res.questionnaire[0]);
              dispatch(
                actions.setQuestionnaireProgress(res.step_no, res.step_all_no)
              );
              dispatch(actions.markAsApproved());
              dispatch(
                actions.addNextQuestion({
                  code: parsedData.code,
                  question_value: parsedData.question_value,
                  prompt_value: parsedData.prompt_value || "",
                  answer_type_code: parsedData.answer_type_code,
                  data_type: parsedData.data_type,
                  answerStatus: parsedData.answers,
                  tooltip: parsedData.tooltip || "",
                  cancelStatus: parsedData.answer_cancel && {
                    id: parsedData.answer_cancel.quse_anse_map_code,
                    label: parsedData.answer_cancel.answer_value,
                    checked: parsedData.answer_cancel.default_value,
                    showModal: parsedData.answer_cancel.questionnaire_cancel,
                  },
                  type: parsedData.type,
                })
              );
            }
          })
          .catch(handleApiErrorFactory(dispatch, actions.resetQuestionnaire))
          .finally(() => dispatch(actions.setSpinner(false)));
      } else {
        const { validationPatternError } =
          questions[questions.length - 1]?.answerStatus?.find(
            (x) => x.validationPattern
          ) ?? {};

        dispatch(actions.setSpinner(false));
        dispatch(
          showModal({
            modalContentTrKey: validationPatternError ?? "bop.confirm.noAnswer",
          })
        );
      }
    }
  };

  const undoLastQuestion = (): ThunkResult => (dispatch) => {
    dispatch(actions.setQuestionDeletingSpinner(true));
    api
      .get(getUrl("back-adequacy"))
      .then((response) =>
        dispatch(
          actions.deleteLastQuestion(response.step_no, response.step_all_no)
        )
      )
      .then(() => dispatch(actions.deleteApproval()))
      .catch(handleApiErrorFactory(dispatch, actions.resetQuestionnaire))
      .finally(() => dispatch(actions.setQuestionDeletingSpinner(false)));
  };

  return {
    singleSelectClickHandler,
    stopQuestionnaire,
    refuseAnswer,
    startQuestionnaire,
    getNextQuestion,
    undoLastQuestion,
    isValid,
  };
};
