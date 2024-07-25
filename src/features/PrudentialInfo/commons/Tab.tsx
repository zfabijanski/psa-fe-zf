import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PruText from "../../../components/UI/PruText/PruText";

interface IProps {
  text: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

const Container = styled.div<Pick<IProps, "active" | "className">>`
  position: relative;
  top: 4px;
  border-bottom: ${({ active, theme }) =>
    active ? `7px solid ${theme.newColors.primary100}` : "none"};
  &:nth-child(1) {
    margin-right: 20px;
  }
  span {
    color: ${({ active, theme }) =>
      active ? theme.newColors.gray100 : theme.colors.darkGray};
    user-select: none;
  }

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 22px;
    }
  }
`;

const Tab: FC<IProps> = ({ text, active, onClick, className }) => {
  return (
    <Container active={active} onClick={onClick} className={className}>
      <PruText fontSize={24}>
        <FormattedMessage id={text} />
      </PruText>
    </Container>
  );
};

export default Tab;
