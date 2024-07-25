import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components/macro";
import Header from "./Header";

interface IProps {
  question: string | React.ReactNode;
  fullWidthAnswers?: boolean;
  className?: string;
}

const Question: FC<PropsWithChildren<IProps>> = (props) => {
  return (
    <Container className={props.className}>
      <Header question={props.question} />
      <Children fullWidthAnswers={props.fullWidthAnswers}>
        {props.children}
      </Children>
    </Container>
  );
};

export default Question;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  align-items: center;
`;

const Children = styled.div<Pick<IProps, "fullWidthAnswers">>`
  width: ${({ fullWidthAnswers }) => (fullWidthAnswers ? "100%" : "150px")};
  margin-top: 24px;
`;
