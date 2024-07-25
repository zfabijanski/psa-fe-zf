import * as apiUtils from "utils/api";
import {
  CodeTypes,
  IAnswerFull,
  SurveyType,
  TextTransformationCode,
  IQuestionRecord,
  IAnswerTree,
} from "../Survey.types";
import {
  generateSurveyActionType,
  generateSurveyActions,
  generateSurveyStore,
  generateSurveyThunks,
} from "./Survey.store";
import { RootState } from "AppStore";
import { AxiosInstance } from "axios";

jest.mock("utils/api");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAnswer: IAnswerFull = Object.freeze({
  code: "code",
  dictionary: null,
  isActive: false,
  isApproved: false,
  isEditable: true,
  isMain: true,
  isVisible: true,
  label: "label",
  text_transform_code: TextTransformationCode.TTSE1,
  type: CodeTypes.String,
  value: "123",
});

const mockSubanswer: IAnswerTree = Object.freeze({
  code: "subcode",
  dictionary: null,
  isActive: false,
  isApproved: false,
  isEditable: true,
  isMain: false,
  isVisible: true,
  label: "label",
  text_transform_code: TextTransformationCode.TTSE1,
  type: CodeTypes.String,
  value: "123",
  subanswers: [],
});

const mockQuestion: IQuestionRecord = Object.freeze({
  answer_type_code: "answer_type_code",
  data_type: CodeTypes.Single,
  answerStatus: [mockAnswer],
  cancelStatus: null,
  code: CodeTypes.Single,
  prompt_value: "prompt_value",
  question_value: "question_value",
  tooltip: "tooltip",
  type: "",
});

describe("Survey action type", () => {
  it("should generate bop action type", () => {
    expect(generateSurveyActionType(SurveyType.bop)).toMatchSnapshot();
  });
  it("should generate idd action type", () => {
    expect(generateSurveyActionType(SurveyType.idd)).toMatchSnapshot();
  });
});

describe("Survey actions", () => {
  it("should generate bop actions", () => {
    expect(generateSurveyActions(SurveyType.bop)).toMatchSnapshot();
  });
  it("should generate idd actions", () => {
    expect(generateSurveyActions(SurveyType.idd)).toMatchSnapshot();
  });
});

describe("Survey store", () => {
  const actionType = generateSurveyActionType(SurveyType.bop);
  let actions = generateSurveyActions(SurveyType.bop);
  let store = generateSurveyStore(actionType);

  beforeEach(() => {
    actions = generateSurveyActions(SurveyType.bop);
    store = generateSurveyStore(actionType);
  });

  it("Handles toggleAnswerRefusal", () => {
    let state: typeof store.initialState = {
      ...store.initialState,
      questions: [
        {
          data_type: CodeTypes.Single,
          answer_type_code: "answer_type_code",
          question_value: "question_value",
          answerStatus: [],
          cancelStatus: {
            checked: false,
            id: "0",
            label: "label",
            showModal: false,
          },
          prompt_value: "prompt_value",
          tooltip: "tooltip",
          code: "code",
          type: "",
        },
      ],
    };
    expect(store.reducer(state, actions.toggleAnswerRefusal())).toEqual({
      ...store.initialState,
      questions: [
        {
          answerStatus: [],
          answer_type_code: "answer_type_code",
          cancelStatus: {
            checked: true,
            id: "0",
            label: "label",
            showModal: false,
          },
          code: "code",
          data_type: "SINGLE",
          prompt_value: "prompt_value",
          question_value: "question_value",
          tooltip: "tooltip",
          type: "",
        },
      ],
    });
  });

  it("Handles resetAnswerValues", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [
            {
              data_type: CodeTypes.Single,
              answer_type_code: "answer_type_code",
              question_value: "question_value",
              answerStatus: [
                {
                  ...mockAnswer,
                  value: "123",
                },
              ],
              cancelStatus: null,
              prompt_value: "prompt_value",
              tooltip: "tooltip",
              code: "code",
              type: "",
            },
          ],
        },
        actions.resetAnswers()
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          data_type: CodeTypes.Single,
          answer_type_code: "answer_type_code",
          question_value: "question_value",
          answerStatus: [
            {
              ...mockAnswer,
              value: "",
            },
          ],
          cancelStatus: null,
          prompt_value: "prompt_value",
          tooltip: "tooltip",
          code: "code",
          type: "",
        },
      ],
    });
  });

  it("Handles resetQuestionnaire", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          currentStep: 99,
        },
        actions.resetQuestionnaire()
      )
    ).toEqual({
      questions: [],
      adequacy_id: null,
      isQuestionLoading: false,
      isQuestionDeleting: false,
      isDatePickerOpened: false,
      allSteps: 0,
      currentStep: 0,
      type: "",
    });
  });

  it("Handles updateString", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [mockQuestion],
        },
        actions.updateStringAnswer("code", "new-value-01")
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            {
              ...mockAnswer,
              isActive: true,
              value: "new-value-01",
            },
          ],
        },
      ],
    });
  });

  it("Handles updateMultiSelect", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [mockQuestion],
        },
        actions.updateMultiSelectAnswer("code")
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            {
              ...mockAnswer,
              isActive: true,
            },
          ],
        },
      ],
    });
  });

  it("Handles updateSingleSelect", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [mockQuestion],
        },
        actions.updateSingleSelectAnswer("code")
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            {
              ...mockAnswer,
              isActive: true,
            },
          ],
        },
      ],
    });
  });

  it("Handles UpdateNestedSingleSelect", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [
            {
              ...mockQuestion,
              answerStatus: [
                mockAnswer,
                {
                  ...mockAnswer,
                  code: "333",
                  isActive: true,
                  subanswers: [
                    mockSubanswer,
                    {
                      ...mockSubanswer,
                      code: "234",
                    },
                  ],
                },
              ],
            },
          ],
        },
        actions.updateNestedSingleSelectAnswer("subcode", ["333"])
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            mockAnswer,
            {
              ...mockAnswer,
              code: "333",
              isActive: true,
              subanswers: [
                {
                  ...mockSubanswer,
                  isActive: true,
                },
                {
                  ...mockSubanswer,
                  code: "234",
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it("Handles AddNextQuestion", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [mockQuestion],
        },
        actions.addNextQuestion(mockQuestion)
      )
    ).toEqual({
      ...store.initialState,
      questions: [mockQuestion, mockQuestion],
    });
  });

  it("Handles SetAdequacyID", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
        },
        actions.setAdequacyID(123)
      )
    ).toEqual({
      ...store.initialState,
      adequacy_id: 123,
    });
  });

  it("Handles SetSpinner", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
        },
        actions.setSpinner(true)
      )
    ).toEqual({
      ...store.initialState,
      isQuestionLoading: true,
    });
  });

  it("Handles SetQuestionDeletingSpinner", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
        },
        actions.setQuestionDeletingSpinner(true)
      )
    ).toEqual({
      ...store.initialState,
      isQuestionDeleting: true,
    });
  });

  it("Handles SetQuestionnaireProgress", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
        },
        actions.setQuestionnaireProgress(10, 14)
      )
    ).toEqual({
      ...store.initialState,
      allSteps: 14,
      currentStep: 10,
    });
  });

  it("Handles MarkAsApproved", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [
            {
              ...mockQuestion,
              answerStatus: [
                { ...mockAnswer, isActive: true, isApproved: false },
                {
                  ...mockAnswer,
                  isActive: false,
                  isApproved: false,
                  subanswers: [
                    {
                      ...mockSubanswer,
                      isActive: true,
                      isApproved: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        actions.markAsApproved()
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            {
              ...mockAnswer,
              isActive: true,
              isApproved: true,
            },
            {
              ...mockAnswer,
              isActive: false,
              isApproved: false,
              subanswers: [
                {
                  ...mockSubanswer,
                  isActive: true,
                  isApproved: true,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it("Handles DeleteApproval", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [
            {
              ...mockQuestion,
              answerStatus: [
                {
                  ...mockAnswer,
                  isActive: true,
                  isApproved: true,
                  subanswers: [
                    {
                      ...mockSubanswer,
                      isApproved: true,
                      isActive: true,
                    },
                  ],
                },
                mockAnswer,
              ],
            },
          ],
        },
        actions.deleteApproval()
      )
    ).toEqual({
      ...store.initialState,
      questions: [
        {
          ...mockQuestion,
          answerStatus: [
            {
              ...mockAnswer,
              isActive: true,
              isApproved: false,
              subanswers: [
                {
                  ...mockSubanswer,
                  isApproved: false,
                  isActive: true,
                },
              ],
            },
            mockAnswer,
          ],
        },
      ],
    });
  });

  it("Handles DeleteLastQuestion", () => {
    expect(
      store.reducer(
        {
          ...store.initialState,
          questions: [mockQuestion, mockQuestion],
        },
        actions.deleteLastQuestion(10, 14)
      )
    ).toEqual({
      ...store.initialState,
      currentStep: 10,
      allSteps: 14,
      questions: [mockQuestion],
    });
  });
});

describe("Survey thunks", () => {
  let actions = generateSurveyActions(SurveyType.bop);

  beforeEach(() => {
    actions = generateSurveyActions(SurveyType.bop);
  });

  it("Handles single select click", async () => {
    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.bop]: {
            questions: [mockQuestion],
          },
        } as RootState)
    );
    const mockGetNextQuestion = jest.fn();
    thunks.getNextQuestion = mockGetNextQuestion();

    thunks.singleSelectClickHandler("code")(dispatch, getState, undefined);

    expect(dispatch).toBeCalledWith({
      payload: { answerCode: "code" },
      type: "@@bop/updateSingleSelect",
    });
  });

  it("Handles stop questionnaire", async () => {
    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.bop]: {
            questions: [mockQuestion],
          },
        } as RootState)
    );

    thunks.stopQuestionnaire()(dispatch, getState, undefined);

    expect(dispatch).toBeCalledWith({
      payload: {
        modalButtons: {
          cancel: {
            onClick: expect.any(Function),
            textTrKey: "confirmWindow.back",
          },
          confirm: {
            onClick: expect.any(Function),
            textTrKey: "confirmWindow.stopAdequacy",
          },
        },
        modalContentTrKey: "bop.confirm.denyQuestion",
        modalIllustration: "alert-double-triangle",
        modalTitleTrKey: "idd.confirm.denyTitle",
        modalType: "danger",
      },
      type: "modal/showModal",
    });
  });

  it("Should handle refuse answer", () => {
    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.bop]: {
            questions: [mockQuestion],
          },
        } as RootState)
    );

    thunks.refuseAnswer()(dispatch, getState, undefined);

    expect(dispatch).toBeCalledWith({ type: "@@bop/toggleAnswerRefusal" });
    expect(dispatch).toBeCalledWith({ type: "@@bop/resetAnswerValues" });
  });

  it("Should handle start questionnaire", async () => {
    (apiUtils as jest.Mocked<{ api: Partial<AxiosInstance> }>).api = {
      post: jest.fn().mockReturnValue(
        Promise.resolve({
          adequacy_id: "123",
          step_no: 1,
          step_all_no: 4,
          questionnaire: [mockQuestion],
        })
      ),
    };

    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.bop]: {
            questions: [mockQuestion],
          },
        } as RootState)
    );

    thunks.startQuestionnaire()(dispatch, getState, undefined);
    await sleep(1);

    expect(dispatch).toBeCalledWith({
      payload: { id: "123" },
      type: "@@bop/setAdequacyId",
    });
    expect(dispatch).toBeCalledWith({
      payload: { allSteps: 4, currentStep: 1 },
      type: "@@bop/setQuestionnaireProgress",
    });
  });

  it("Should reset idd status when starting questionnaire", async () => {
    (apiUtils as jest.Mocked<{ api: Partial<AxiosInstance> }>).api = {
      post: jest.fn().mockReturnValue(
        Promise.resolve({
          adequacy_id: "123",
          step_no: 1,
          step_all_no: 4,
          questionnaire: [mockQuestion],
        })
      ),
    };

    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.idd,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.idd]: {
            questions: [mockQuestion],
          },
        } as RootState)
    );

    thunks.startQuestionnaire()(dispatch, getState, undefined);
    await sleep(1);

    expect(dispatch).toBeCalledWith({
      payload: { id: "123" },
      type: "@@bop/setAdequacyId",
    });
    expect(dispatch).toBeCalledWith({
      type: "meetings/setCurrentMeetingHaveIdd",
      payload: false,
    });
    expect(dispatch).toBeCalledWith({
      payload: { allSteps: 4, currentStep: 1 },
      type: "@@bop/setQuestionnaireProgress",
    });
  });

  it("Should handle next question", async () => {
    (apiUtils as jest.Mocked<{ api: Partial<AxiosInstance> }>).api = {
      post: jest.fn().mockReturnValue(
        Promise.resolve({
          adequacy_id: "123",
          step_no: 2,
          step_all_no: 4,
          questionnaire: [mockQuestion],
        })
      ),
    };

    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      [SurveyType.bop]: {
        adequacyId: "123",
        questions: [mockQuestion],
      },
      fullscreenSpinner: { active: false },
    });

    thunks.getNextQuestion()(dispatch, getState, undefined);
    await sleep(1);

    expect(dispatch).toBeCalledWith({
      payload: { isQuestionLoading: true },
      type: "@@bop/setSpinner",
    });
  });

  it("Should handle next question with error", async () => {
    (apiUtils as jest.Mocked<{ api: Partial<AxiosInstance> }>).api = {
      post: jest.fn().mockReturnValue(Promise.reject()),
    };

    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      [SurveyType.bop]: {
        adequacyId: "123",
        questions: [mockQuestion],
      },
      fullscreenSpinner: { active: false },
    });

    thunks.getNextQuestion()(dispatch, getState, undefined);
    await sleep(1);

    expect(dispatch).toBeCalledWith({
      payload: { isQuestionLoading: true },
      type: "@@bop/setSpinner",
    });
  });

  it('Handles "next question" click for MultiGroup data type in IDD', async () => {
    actions = generateSurveyActions(SurveyType.idd);

    (apiUtils as jest.Mocked<{ api: Partial<AxiosInstance> }>).api = {
      post: jest.fn().mockReturnValue(
        Promise.resolve({
          questionnaire_end: "Y",
        })
      ),
    };
    const thunks = generateSurveyThunks({
      actions,
      type: SurveyType.idd,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    const dispatch = jest.fn();
    const getState = jest.fn(
      () =>
        ({
          [SurveyType.idd]: {
            questions: [
              {
                ...mockQuestion,
                data_type: CodeTypes.MultiGroup,
              },
            ],
          },
          fullscreenSpinner: { active: false },
        } as RootState)
    );

    thunks.getNextQuestion()(dispatch, getState, undefined);
    await sleep(1);

    expect(dispatch).toBeCalledWith({
      payload: { answerCode: "code", newValue: "123" },
      type: "@@idd/updateString",
    });
    expect(dispatch).toBeCalledWith({
      payload: { isQuestionLoading: true },
      type: "@@idd/setSpinner",
    });
  });

  it("isValid should be false when string type is empty", () => {
    const { isValid } = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    expect(
      isValid([
        {
          ...mockQuestion,
          data_type: CodeTypes.Single,
          answerStatus: [{ ...mockAnswer, value: "" }],
        },
      ])
    ).toBe(false);
  });

  it("isValid should be false when string type is empty and answer has a validation pattern", () => {
    const { isValid } = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    expect(
      isValid([
        {
          ...mockQuestion,
          data_type: CodeTypes.Single,
          answerStatus: [
            {
              ...mockAnswer,
              value: "",
              validationPattern: "^((?!(0))\\d{0,9})$|^(0{0,1})$",
              validationPatternError: "Please enter a valid number",
            },
          ],
        },
      ])
    ).toBe(false);
  });

  it("isValid should be true when string matches validation pattern", () => {
    const { isValid } = generateSurveyThunks({
      actions,
      type: SurveyType.bop,
      handlers: {
        onStopQuestionnaireConfirm: jest.fn(),
        onStopQuestionnaireCancel: jest.fn(),
      },
    });

    expect(
      isValid([
        {
          ...mockQuestion,
          data_type: CodeTypes.Single,
          answerStatus: [
            {
              ...mockAnswer,
              value: "123",
              validationPattern: "^((?!(0))\\d{0,9})$|^(0{0,1})$",
              validationPatternError: "Please enter a valid number",
            },
          ],
        },
      ])
    ).toBe(true);
  });
});
