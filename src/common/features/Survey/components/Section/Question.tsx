import styled from "styled-components";
import {
  CalculatorQuestionCodes,
  CodeTypes,
  IAllAnswers,
  ICancel,
  IHeader,
  QuestionDataTypeCode,
  ParsedAnswers,
} from "../../Survey.types";
import { IDropdownLists } from "slices/bopDropdownLists";
import AuxiliaryCalculator from "../AuxiliaryCalculator";
import { expenses38 } from "../AuxiliaryCalculator/ExpensesCalculator/data";
import {
  needs32,
  needs33,
  needs34,
} from "../AuxiliaryCalculator/NeedsCalculator/data";
import Answers from "./Answers";
import Footer from "./Footer";
import Header from "./Header";

interface IQuestion extends IAllAnswers, IHeader, Partial<ICancel> {
  code: string;
  type: CodeTypes;
  disabled: boolean;
  dateFormat: string;
  dropdownLists: IDropdownLists;
}

const QuestionContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const checkShouldVerticallyAlignFooter = (answers: ParsedAnswers[]) => {
  return (
    answers?.filter((x) => x.isVisible).length < 3 &&
    !answers?.every(({ type }) => type === CodeTypes.Boolean)
  );
};

const Question = ({
  code,
  question,
  prompt,
  cancel,
  onChange,
  onCancellationChange,
  statuses,
  type,
  tooltip,
  disabled,
  dateFormat,
  dropdownLists,
}: IQuestion) => {
  const shouldVerticallyAlignFooter =
    checkShouldVerticallyAlignFooter(statuses);

  const renderAnswers = () => {
    switch (code) {
      case CalculatorQuestionCodes.ADQ_QUE_32:
        return (
          <AuxiliaryCalculator
            type={"needs"}
            data={needs32}
            status={statuses[0]}
            onChange={onChange}
            disabled={disabled}
          />
        );
      case CalculatorQuestionCodes.ADQ_QUE_33_1:
        return (
          <AuxiliaryCalculator
            type={"needs"}
            data={needs33}
            status={statuses[0]}
            onChange={onChange}
            disabled={disabled}
          />
        );
      case CalculatorQuestionCodes.ADQ_QUE_34_1:
        return (
          <AuxiliaryCalculator
            type={"needs"}
            data={needs34}
            status={statuses[0]}
            onChange={onChange}
            disabled={disabled}
          />
        );
      case CalculatorQuestionCodes.ADQ_QUE_38_5:
        return (
          <AuxiliaryCalculator
            type={"expenses"}
            data={expenses38}
            status={statuses[0]}
            onChange={onChange}
            disabled={disabled}
          />
        );
      default:
        return (
          <Answers
            statuses={statuses}
            onChange={onChange}
            type={type as QuestionDataTypeCode}
            disabled={disabled}
            dateFormat={dateFormat}
            dropdownLists={dropdownLists}
            questionCode={code}
          />
        );
    }
  };

  return (
    <>
      <Header question={question} prompt={prompt} tooltip={tooltip} />
      <QuestionContainer>
        {renderAnswers()}
        {cancel && onCancellationChange && (
          <Footer
            cancellationStatus={cancel}
            onChange={onCancellationChange}
            disabled={disabled}
            css={{
              ...(shouldVerticallyAlignFooter && {
                position: "absolute",
                bottom: "20px",
                right: 0,
              }),
            }}
          />
        )}
      </QuestionContainer>
    </>
  );
};
export default Question;
