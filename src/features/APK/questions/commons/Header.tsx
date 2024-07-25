import React, { FC } from "react";
import styled from "styled-components/macro";
import { addNonBreakingSpace } from "../../../../utils/formatters";
import { WhiteSpace } from "../../../../utils/types";

interface IProps {
  question: string | React.ReactNode;
}

const Header: FC<IProps> = ({ question }) => {
  return (
    <Container>
      {typeof question === "string"
        ? addNonBreakingSpace(question, WhiteSpace.NonBreakingSpace)
        : question}
    </Container>
  );
};

const Container = styled.h4`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.newColors.gray100};
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  margin-bottom: 0;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
