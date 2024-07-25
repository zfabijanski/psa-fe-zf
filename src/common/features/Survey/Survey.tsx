import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PruQuestion from "./components/Question/Question";
import NextQuestionIndicator from "./components/QuestionNavigation/NextQuestionIndicator";
import PreviousQuestionIndicator from "./components/QuestionNavigation/PreviousQuestionIndicator";
import withSpinner from "./components/QuestionNavigation/withSpinner";
import { QuestionTimeline } from "./components/QuestionTimeline";
import { dateFormat } from "./components/QuestionTypes/parsers";
import { CodeTypes } from "./Survey.types";
import { IQuestionRecord } from "slices/bop";
import { IDropdownLists } from "slices/bopDropdownLists";

interface IProps {
  questions: IQuestionRecord[];
  dropdownLists: IDropdownLists;
  isQuestionLoading: boolean;
  isQuestionDeleting: boolean;
  handleAnswerRefusal: () => void;
  resetState: () => void;
  updateStringAnswer: (answerCode: string, newValue: string) => void;
  updateMultiSelectAnswer: (answerCode: string) => void;
  updateSingleSelectAnswer: (answerCode: string) => void;
  updateNestedSingleSelectAnswer: (
    answerCode: string,
    parentPath: string[]
  ) => void;
  updateNestedMultiSelectAnswer: (
    answerCode: string,
    parentPath: string[]
  ) => void;
  onNextQuestionClick: () => void;
  onPreviousQuestionClick: () => void;
  isValid: (questions: IQuestionRecord[]) => boolean;
}

const Container = styled.div<Pick<IProps, "isQuestionLoading">>`
  position: relative;
  margin: 62px 0;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isQuestionLoading }) =>
    isQuestionLoading ? "none" : "auto"};
`;
const PreviousQuestionContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -24px;
  padding-top: 24px;
`;

export const Survey: React.FC<IProps> = (props) => {
  const bottomElementRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    if (bottomElementRef.current && bottomElementRef.current.parentElement) {
      bottomElementRef.current.scrollIntoView({ behavior: "smooth" });
      bottomElementRef.current.parentElement.focus();
    }
  };

  const isLastAnswerValid = () =>
    !props.isQuestionLoading && props.isValid(props.questions);
  const currentQuestion = props.questions?.[props.questions?.length - 1] ?? {};

  useEffect(() => {
    if (!props.isQuestionLoading && currentQuestion.type !== "CONFIRM") {
      scrollIntoView();
    }

    // We want to snapshot the current question when loading changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isQuestionLoading]);

  useEffect(() => {
    const {
      questions: { length },
    } = props;
    if (
      length > 0 &&
      props.questions[length - 1].data_type === CodeTypes.Tree
    ) {
      scrollIntoView();
    }
  });
  const NextQuestion = withSpinner(NextQuestionIndicator);
  const PreviousQuestion = withSpinner(PreviousQuestionIndicator);

  const handleNextQuestion = () => {
    // next tick needed for handling all blur events and callbacks
    setTimeout(() => props.onNextQuestionClick(), 0);
  };

  return (
    <>
      <Container isQuestionLoading={props.isQuestionLoading}>
        <QuestionTimeline isActive={props.questions?.length === 1} isHome />
        {props.questions.map((elt, index) => (
          <React.Fragment key={elt.code}>
            {props.questions.length > 1 &&
              index === props.questions.length - 1 && (
                <PreviousQuestionContainer>
                  <QuestionTimeline withIcon={false} isActive />
                  <PreviousQuestion
                    isLoading={props.isQuestionDeleting}
                    shouldDisplayIndicator={
                      !props.isQuestionLoading && !props.isQuestionDeleting
                    }
                    onClick={props.onPreviousQuestionClick}
                  />
                </PreviousQuestionContainer>
              )}
            <PruQuestion
              key={elt.code}
              code={elt.code}
              index={index}
              type={elt.data_type as CodeTypes}
              question={elt.question_value}
              prompt={elt.prompt_value || ""}
              tooltip={elt.tooltip || ""}
              statuses={elt.answerStatus}
              cancel={elt.cancelStatus}
              handleAnswerRefusal={props.handleAnswerRefusal}
              resetAnswers={props.resetState}
              answer_type_code={elt.answer_type_code}
              updateStringAnswer={props.updateStringAnswer}
              updateMultiSelectAnswer={props.updateMultiSelectAnswer}
              updateSingleSelectAnswer={props.updateSingleSelectAnswer}
              updateNestedSingleSelectAnswer={
                props.updateNestedSingleSelectAnswer
              }
              updateNestedMultiSelectAnswer={
                props.updateNestedMultiSelectAnswer
              }
              disabled={index < props.questions.length - 1}
              dateFormat={dateFormat}
              dropdownLists={props.dropdownLists}
            />
          </React.Fragment>
        ))}
        <NextQuestion
          isLoading={props.isQuestionLoading}
          shouldDisplayIndicator={
            isLastAnswerValid() &&
            !props.isQuestionDeleting &&
            currentQuestion.type !== "INFO" &&
            currentQuestion.type !== "CONFIRM"
          }
          onClick={handleNextQuestion}
        />
      </Container>
      <div ref={bottomElementRef} />
    </>
  );
};
