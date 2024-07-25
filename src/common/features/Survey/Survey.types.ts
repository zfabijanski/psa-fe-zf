export enum SurveyType {
  idd = "idd",
  bop = "bop",
}

export interface IHeader {
  question: string;
  prompt: string;
  tooltip: string;
}

export interface IIcon {
  icon_code: string;
  icon_value: string;
}

export enum CodeTypes {
  Single = "SINGLE",
  Multi = "MULTI",
  MultiGroup = "MULTI_GROUP",
  Boolean = "BOOLEAN",
  All = "ALL",
  Date = "DATE",
  Integer = "INTEGER",
  Decimal = "DECIMAL",
  String = "STRING",
  Textarea = "TEXTAREA",
  Tree = "TREE",
  Info = "INFO",
}

export type QuestionDataTypeCode =
  | CodeTypes.Multi
  | CodeTypes.Single
  | CodeTypes.MultiGroup
  | CodeTypes.Tree
  | CodeTypes.Info;
type AnswerTypeCode =
  | CodeTypes.Single
  | CodeTypes.Multi
  | CodeTypes.Boolean
  | CodeTypes.All;
export type AnswerDataTypeCode =
  | CodeTypes.Date
  | CodeTypes.Boolean
  | CodeTypes.Integer
  | CodeTypes.Decimal
  | CodeTypes.String
  | CodeTypes.Textarea;

export enum TextTransformationCode {
  TTSE1 = "TTSE-1",
  TTSE2 = "TTSE-2",
  TTSE3 = "TTSE-3",
  TTSE4 = "TTSE-4",
  TTSE5 = "TTSE-5",
}

export interface IAnswerJSON {
  quse_anse_map_code: string;
  answer_code: string;
  answer_value: string;
  answer_editable: string;
  answer_visible: string;
  answer_sufix: string;
  answer_data_type_code: AnswerDataTypeCode;
  answer_patterns_code: string | null;
  answer_patterns_value: string | null;
  answer_patterns_error: string | null;
  answer_is_main: string;
  answer_lv_code: DropdownSet | null;
  default_value: string | null;
  icons?: IIcon[];
  subanswers?: IAnswerJSON[];
  text_transform_code?: TextTransformationCode;
  text_transform_value?: string;
  place_holder_lv: string | null;
  implicit_value_lv: string | null;
}

export interface IAnswerCancelJSON {
  quse_anse_map_code: string;
  answer_code: string;
  answer_value: string;
  answer_type_code: AnswerTypeCode;
  answer_type_value?: string;
  answer_data_type_code: string;
  default_value: string;
  answer_is_main: string;
  questionnaire_cancel: string;
}

export interface IOnChange {
  onChange(
    answerCode: string,
    isMain?: boolean,
    parentPath?: string[]
  ): (newValue?: string) => void;
}

export interface IAllAnswers extends IOnChange {
  statuses: ParsedAnswers[];
}

export interface IQuestionJSON {
  questionnaire_code: string;
  adequacy_version?: string;
  sections_code?: string;
  sections_value?: string;
  question_type_code: string;
  question_data_type_value?: string;
  answer_type_code: string;
  answer_type_value?: string;
  question_code: string;
  question_value: string;
  prompt_value: string | null;
  question_tooltip_code: string | null;
  question_tooltip_value: string | null;
  questionnaire_end?: string;
  analysis_si?: string;
  adequacy?: string;
  required?: string;
  order_no?: number;
  suborder_no?: number;
  answers: IAnswerJSON[];
  answer_cancel: IAnswerCancelJSON | IAnswerCancelJSON[];
}

export enum CalculatorQuestionCodes {
  ADQ_QUE_4 = "ADQ_QUE_4",
  ADQ_QUE_32 = "ADQ_QUE_32",
  ADQ_QUE_33_1 = "ADQ_QUE_33_1",
  ADQ_QUE_34_1 = "ADQ_QUE_34_1",
  ADQ_QUE_38_5 = "ADQ_QUE_38_5",
}

export interface ICancelStatusObject {
  id: string;
  label: string;
  checked: boolean;
  showModal: boolean;
}

export type CancelStatus = ICancelStatusObject | null;

export interface ICancel {
  cancel: CancelStatus;
  onCancellationChange: () => void;
}

export interface IModal {
  modalOnCancel: () => void;
  modalOnConfirm: () => void;
  showModal: boolean;
}

export type DropdownSet =
  | "ANSWER_NUM_0_5_LV"
  | "ANSWER_NUM_1_15_LV"
  | "ANSWER_RETIREMENT_LV"
  | "ANSWER_OLD_LV";

export const isAnswerTree = (answer: ParsedAnswers): answer is IAnswerTree => {
  return (answer as IAnswerTree).subanswers !== undefined;
};

export const isAnswerMultiGroup = (
  answer: ParsedAnswers
): answer is IAnswerMultiGroup => {
  return (answer as IAnswerMultiGroup).subanswersCodes !== undefined;
};

export interface IAnswerBase {
  code: string;
  type: AnswerDataTypeCode;
  value: string;
  isActive: boolean;
  isApproved: boolean;
  error?: boolean | string;
  isMain: boolean;
  dictionary: DropdownSet | null;
  text_transform_code: TextTransformationCode;
  text_transform_value?: string;
  isVisible: boolean;
  isEditable: boolean;
  implicitValue?: string;
  placeHolder?: string;
  validationPattern?: string | RegExp;
  validationPatternError?: string;
}

export type ParsedAnswers = IAnswerFull | IAnswerMultiGroup | IAnswerTree;

export interface IAnswerFull extends IAnswerBase {
  label?: string;
  icons?: string[];
  answer_sufix?: string;
}

export interface IAnswerMultiGroup extends IAnswerBase {
  label: string;
  subanswersCodes: string[];
}

export interface IAnswerTree extends IAnswerBase {
  label: string;
  subanswers: IAnswerTree[];
}

export interface IAnswerCancel {
  quse_anse_map_code: string;
  answer_value: string;
  questionnaire_cancel: boolean;
  default_value: boolean;
}

export interface IQuestion {
  data_type: QuestionDataTypeCode;
  answer_type_code: string;
  question_value: string;
  answers: ParsedAnswers[];
  answer_cancel: IAnswerCancel | null;
  prompt_value: string | null;
  code: string;
  tooltip: string | null;
  type: string;
}

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

export interface ISurveyState {
  questions: IQuestionRecord[];
  adequacy_id: number | null;
  isQuestionLoading: boolean;
  isDatePickerOpened: boolean;
  isQuestionDeleting: boolean;
  allSteps: number;
  currentStep: number;
}
