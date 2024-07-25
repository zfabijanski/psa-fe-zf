import moment from "moment";
import { IReport } from "common/services/types";
import {
  IAnswerMultiGroup,
  IAnswerTree,
  IQuestion,
  isAnswerMultiGroup,
  isAnswerTree,
  ParsedAnswers,
  AnswerDataTypeCode,
  CancelStatus,
  CodeTypes,
  IAnswerCancelJSON,
  IAnswerJSON,
  IQuestionJSON,
  QuestionDataTypeCode,
  TextTransformationCode,
} from "../../Survey.types";

export const dateFormat = "YYYY-MM-DD";

export const provideValue = (value: string, type: string): string => {
  if (type === CodeTypes.Date) {
    return moment(value).isValid() ? moment(value).format(dateFormat) : "";
  }
  return value;
};

export const prepareForReport = (
  answerStatus: ParsedAnswers[],
  cancelStatus: CancelStatus,
  skipNestedCheck: boolean = false
): IReport[] => {
  const parseBooleanValue = (elt: ParsedAnswers): string =>
    parseAnswerBooleanToString(isAnswerMultiGroup(elt) || elt.isActive);

  const removeSeparators = (elt: ParsedAnswers): string =>
    elt.type === CodeTypes.Integer ? elt.value.split(" ").join("") : elt.value;

  const getAnswers = (answers: ParsedAnswers[]): IReport[] => {
    return answers.reduce((acc: IReport[], elt) => {
      acc.push({
        quse_anse_map_code: elt.code,
        value:
          elt.type === CodeTypes.Boolean
            ? parseBooleanValue(elt)
            : removeSeparators(elt),
      });
      if (!skipNestedCheck && isAnswerTree(elt)) {
        acc.push(...getAnswers(elt.subanswers));
      }
      return acc;
    }, []);
  };

  const report = [...getAnswers(answerStatus)];
  if (cancelStatus) {
    report.push({
      quse_anse_map_code: cancelStatus.id,
      value: parseAnswerBooleanToString(cancelStatus.checked),
    });
  }
  return report;
};

const getFlattenAnswers = (answers: IAnswerJSON[] = []): IAnswerMultiGroup[] =>
  answers.reduce((acc: IAnswerMultiGroup[], elt) => {
    const parsedAnswer: IAnswerMultiGroup = {
      ...getCustomAnswerData(elt),
      label: elt.answer_value,
      validationPattern: elt.answer_patterns_value || undefined,
      text_transform_code:
        elt.text_transform_code || TextTransformationCode.TTSE5,
      subanswersCodes: (elt.subanswers || []).map(
        (answer) => answer.quse_anse_map_code
      ),
    };
    acc.push(parsedAnswer);
    return [...acc, ...getFlattenAnswers(elt.subanswers)];
  }, []);

const getTreeStructure = (answers: IAnswerJSON[]): IAnswerTree[] => {
  return answers.map((answer) => ({
    code: answer.quse_anse_map_code,
    type: answer.answer_data_type_code,
    value: answer.default_value || "",
    label: answer.answer_value,
    icons: answer.icons && answer.icons.map((icon) => icon.icon_value),
    answer_sufix: answer.answer_sufix,
    isApproved: false,
    isActive: getProperBooleanValue(
      answer.default_value || "",
      answer.answer_data_type_code
    ),
    isMain: parseAnswerStringToBoolean(answer.answer_is_main),
    subanswers: getTreeStructure(answer.subanswers || []),
    dictionary: answer.answer_lv_code,
    text_transform_code:
      answer.text_transform_code || TextTransformationCode.TTSE5,
    isVisible: parseAnswerStringToBoolean(answer.answer_visible),
    isEditable: parseAnswerStringToBoolean(answer.answer_editable),
  }));
};

export const parseQuestion = (question: IQuestionJSON): IQuestion => ({
  code: question.question_code,
  data_type: question.question_type_code as QuestionDataTypeCode,
  answer_type_code: question.answer_type_code,
  question_value: question.question_value,
  tooltip: question.question_tooltip_value,
  prompt_value: question.prompt_value,
  answers: getAnswersByQuestionType(
    question.answers,
    question.question_type_code as QuestionDataTypeCode
  ),
  type: question.question_type_code,
  answer_cancel: getCancelObject(question.answer_cancel)
    ? {
        quse_anse_map_code: getCancelObject(question.answer_cancel)
          .quse_anse_map_code,
        answer_value: getCancelObject(question.answer_cancel).answer_value,
        default_value: parseAnswerStringToBoolean(
          getCancelObject(question.answer_cancel).default_value
        ),
        questionnaire_cancel: parseAnswerStringToBoolean(
          getCancelObject(question.answer_cancel).questionnaire_cancel
        ),
      }
    : null,
});

const getCancelObject = (
  cancel: IAnswerCancelJSON | IAnswerCancelJSON[]
): IAnswerCancelJSON => {
  return Array.isArray(cancel) ? cancel[0] : cancel;
};

export const parseAnswerBooleanToString = (value: boolean): string =>
  value ? "Y" : "N";

export const parseAnswerStringToBoolean = (value: string): boolean =>
  value === "Y";

const getProperBooleanValue = (
  value: string,
  type: AnswerDataTypeCode
): boolean => {
  if (
    type === CodeTypes.String ||
    type === CodeTypes.Integer ||
    type === CodeTypes.Decimal
  ) {
    return value !== "";
  } else if (type === CodeTypes.Date) {
    return true;
  }
  return parseAnswerStringToBoolean(value);
};

const getCustomAnswerData = (answer: IAnswerJSON, type?: CodeTypes) => ({
  code: answer.quse_anse_map_code,
  type: answer.answer_data_type_code,
  value: provideValue(answer.default_value || "", answer.answer_data_type_code),
  // isActive is a param to keep info about selection after click
  isActive:
    type === CodeTypes.Info
      ? true
      : getProperBooleanValue(
          answer.default_value || "",
          answer.answer_data_type_code
        ),
  // todo: isApproved should be fetched from JSON; no such param at the moment
  isApproved: false,
  isMain: parseAnswerStringToBoolean(answer.answer_is_main),
  dictionary: answer.answer_lv_code,
  text_transform_value: answer.text_transform_value,
  text_transform_code:
    answer.text_transform_code || TextTransformationCode.TTSE5,
  isVisible: parseAnswerStringToBoolean(answer.answer_visible),
  isEditable: parseAnswerStringToBoolean(answer.answer_editable),
  implicitValue: answer.implicit_value_lv || undefined,
  placeHolder: answer.place_holder_lv || undefined,
});

const parseAnswerByAnswerType = (answer: IAnswerJSON, type: CodeTypes) =>
  (() => {
    switch (answer.answer_data_type_code) {
      case CodeTypes.Boolean:
        return {
          ...getCustomAnswerData(answer, type),
          label: answer.answer_value,
          icons: (answer.icons || []).map((icon) => icon.icon_value),
        };

      case CodeTypes.Date:
        return { ...getCustomAnswerData(answer, type) };

      default:
        return {
          ...getCustomAnswerData(answer, type),
          answer_sufix: answer.answer_sufix || "",
          validationPattern: answer.answer_patterns_value || undefined,
          validationPatternError: answer.answer_patterns_error || undefined,
        };
    }
  })();

const getAnswersByQuestionType = (
  answers: IAnswerJSON[],
  type: QuestionDataTypeCode
) => {
  switch (type) {
    case CodeTypes.MultiGroup:
      return getFlattenAnswers(answers);
    case CodeTypes.Tree:
      return getTreeStructure(answers);
    default:
      return answers.map((answer) => ({
        ...parseAnswerByAnswerType(answer, type),
      }));
  }
};
