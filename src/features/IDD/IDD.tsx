import React, { useEffect } from "react";
import { isValid } from "slices/idd";
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
}

const IDD: React.FC<IProps> = (props) => {
  const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      props.getNextQuestion();
    }
  };

  useEffect(() => {
    props.startQuestionnaire();
    return () => window.removeEventListener("keydown", handleEnterPress, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.isConfirmModalVisible) {
      window.addEventListener("keydown", handleEnterPress, true);
    }
    return () => {
      window.removeEventListener("keydown", handleEnterPress, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isConfirmModalVisible]);

  const handlePrevButtonClick = () => props.stopQuestionnaire();
  return (
    <PageLayout
      pageName="idd.title"
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: handlePrevButtonClick },
        ],
        rightSection: props.questionsLength > 0 && [
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.next",
            onClick: props.getNextQuestion,
          },
        ],
      }}
    >
      <Questionnaire isValid={isValid} />
    </PageLayout>
  );
};

export default IDD;
