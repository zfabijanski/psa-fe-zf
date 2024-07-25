import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import PruButton from "components/UI/PruButton/PruButton";

const PrevButton = styled(PruButton)`
  border: 2px solid ${({ theme }) => theme.newColors.gray100};
  margin-bottom: 80px;
  padding: 0 12px;
`;

interface IProps {
  onClick: () => void;
}

const PreviousQuestionIndicator: React.FC<IProps> = (props) => {
  return (
    <PrevButton
      buttonType="secondary"
      icon="arrow-up"
      iconPosition="left"
      children={<FormattedMessage id={"bop.label.undo"} />}
      onClick={props.onClick}
    />
  );
};

export default PreviousQuestionIndicator;
