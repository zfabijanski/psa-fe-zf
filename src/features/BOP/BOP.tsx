import React, { useEffect } from "react";
import { isValid } from "slices/bop";
import PageLayout from "../../layouts/PageLayout";
import Questionnaire from "./Questionnaire";
interface IProps {
  questionsLength: number;
  getNextQuestion: () => void;
  startQuestionnaire: () => void;
  stopQuestionnaire: () => void;
  allSteps: number;
  currentStep: number;
  isConfirmModalVisible: boolean;
  isAuxiliaryCalculatorVisible: boolean;
}

const BOP: React.FC<IProps> = (props) => {
  const handleNextQuestion = () => {
    // next tick needed for handling all blur events and callbacks
    setTimeout(() => props.getNextQuestion(), 0);
  };
  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextQuestion();
    }
  };

  useEffect(() => {
    props.startQuestionnaire();
    return () => window.removeEventListener("keydown", handleEnterPress, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.isConfirmModalVisible && !props.isAuxiliaryCalculatorVisible) {
      window.addEventListener("keydown", handleEnterPress, true);
    }
    return () => {
      window.removeEventListener("keydown", handleEnterPress, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isConfirmModalVisible, props.isAuxiliaryCalculatorVisible]);

  const handlePrevButtonClick = () => props.stopQuestionnaire();
  return (
    <PageLayout
      pageName="bop.title"
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: handlePrevButtonClick },
        ],
        rightSection: props.questionsLength > 0 && [
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.next",
            onClick: handleNextQuestion,
          },
        ],
      }}
    >
      <Questionnaire isValid={isValid} />
    </PageLayout>
  );
};

export default BOP;
