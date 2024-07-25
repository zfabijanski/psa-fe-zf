import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

interface IProps {
  allSteps: number;
  currentStep: number;
}

const StyledQuestionProgressBar = styled.div`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.newColors.primary100};
  color: ${({ theme }) => theme.newColors.white100};
  border-radius: 200px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionProgressBar: React.FC<IProps> = ({ currentStep, allSteps }) => {
  return (
    <StyledQuestionProgressBar>
      <FormattedMessage
        id="bop.label.XofY"
        values={{ currentStep, allSteps }}
      />
    </StyledQuestionProgressBar>
  );
};

export default QuestionProgressBar;
