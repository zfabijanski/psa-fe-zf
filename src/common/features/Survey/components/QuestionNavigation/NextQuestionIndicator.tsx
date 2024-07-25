import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Icon } from "components/UI/Icon";
import PruButton from "components/UI/PruButton/PruButton";

const PressEnter = styled(PruButton)`
  color: ${({ theme }) => theme.newColors.primary100};
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.48),
      rgba(255, 255, 255, 0.48)
    ),
    ${({ theme }) => theme.newColors.primary20};
  border: 2px solid ${({ theme }) => theme.newColors.primary100};
  margin-top: -52px;
  padding: 0 27px 0 0;
`;

const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.newColors.primary100};
  margin-right: 27px;
  width: 48px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
interface IProps {
  onClick: () => void;
}

const NextQuestionIndicator: React.FC<IProps> = (props) => {
  return (
    <PressEnter
      onClick={props.onClick}
      buttonType="secondary"
      children={
        <>
          <IconWrapper>
            <Icon name="corner-downn-left" width={24} color="white100" />
          </IconWrapper>
          <FormattedMessage id={"bop.label.enter"} />
        </>
      }
    />
  );
};

export default NextQuestionIndicator;
