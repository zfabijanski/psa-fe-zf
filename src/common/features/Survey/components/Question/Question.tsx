import React from "react";
import styled from "styled-components";
import Question from "../Section/Question";
import { IDropdownLists } from "slices/bopDropdownLists";
import { QuestionTimeline } from "../QuestionTimeline";
import { CancelStatus, CodeTypes, ParsedAnswers } from "../../Survey.types";

const OuterContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1056px;
  padding: 0px 48px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 80px;
`;

interface IProps {
  statuses: ParsedAnswers[];
  dropdownLists: IDropdownLists;
  cancel: CancelStatus;
  code: string;
  index?: number;
  type: CodeTypes;
  question: string;
  prompt: string;
  tooltip: string;
  answer_type_code: string;
  disabled: boolean;
  dateFormat: string;
  handleAnswerRefusal?: () => void;
  resetAnswers: () => void;
  updateStringAnswer?: (answerCode: string, newValue: string) => void;
  updateMultiSelectAnswer: (answerCode: string) => void;
  updateSingleSelectAnswer: (answerCode: string) => void;
  updateNestedSingleSelectAnswer?: (
    answerCode: string,
    parentPath: string[]
  ) => void;
  updateNestedMultiSelectAnswer?: (
    answerCode: string,
    parentPath: string[]
  ) => void;
}

class PruQuestion extends React.Component<IProps> {
  private handleChange =
    (answerCode: string, isMain: boolean, parentPath: string[] = []) =>
    (newValue?: string) => {
      if (this.props.cancel && this.props.cancel.checked) {
        return;
      }

      const mainActiveAnswers = this.props.statuses.filter(
        (answer) => answer.isMain && answer.isActive
      );

      /*
  		below code checks if:
  		 * change is handled within all of the answer components, excluding
  		   the level of subanswers in the Tree component (!parentPath.length)
  		 AND
  		 * currently selected answer is main (isMain)
  		   OR
  		   if there is already selected answer (isActive) in state
  		   with "isMain" property (mainActiveAnswers.length)

  		if condition is true - answerStatus resets to initial values
    */
      if (
        this.props.type !== CodeTypes.MultiGroup &&
        !parentPath.length &&
        (isMain || mainActiveAnswers.length)
      ) {
        this.props.resetAnswers();
      }

      if (typeof newValue === "string" && this.props.updateStringAnswer) {
        this.props.updateStringAnswer(answerCode, newValue);
      } else {
        this.updateBooleanAnswer(
          answerCode,
          this.props.answer_type_code,
          parentPath,
          isMain
        );
      }
    };

  private updateBooleanAnswer = (
    answerCode: string,
    answerType: string,
    parentPath: string[] = [],
    isMain: boolean
  ) => {
    const { type } = this.props;
    const parentButton = this.props.statuses.find(
      (elt) => elt.code === answerCode
    );
    if (type === CodeTypes.Tree) {
      if (parentButton && !parentButton.isMain) {
        this.props.updateMultiSelectAnswer(answerCode);
      } else if (!isMain && this.props.updateNestedMultiSelectAnswer) {
        this.props.updateNestedMultiSelectAnswer(answerCode, parentPath);
      } else if (this.props.updateNestedSingleSelectAnswer) {
        this.props.updateNestedSingleSelectAnswer(answerCode, parentPath);
      }
    } else {
      if (
        answerType === CodeTypes.Multi &&
        parentButton &&
        !parentButton.isMain
      ) {
        this.props.updateMultiSelectAnswer(answerCode);
      } else {
        this.props.updateSingleSelectAnswer(answerCode);
      }
    }
  };

  public render() {
    const {
      statuses,
      cancel,
      code,
      type,
      question,
      prompt,
      tooltip,
      disabled,
      handleAnswerRefusal,
      dateFormat,
      dropdownLists,
    } = this.props;

    return (
      <OuterContainer>
        <QuestionTimeline isActive={!disabled} />

        <Container>
          <Question
            dateFormat={dateFormat}
            disabled={disabled}
            code={code}
            type={type as CodeTypes}
            question={question}
            prompt={prompt}
            tooltip={tooltip}
            statuses={statuses}
            cancel={cancel}
            onChange={this.handleChange}
            onCancellationChange={handleAnswerRefusal}
            dropdownLists={dropdownLists}
          />
        </Container>
      </OuterContainer>
    );
  }
}

export default PruQuestion;
