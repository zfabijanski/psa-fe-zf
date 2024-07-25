import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import ScrollableContainer from "../../../../components/UI/ScrollableContainer/ScrollableContainer";

const ScrollableContainerDiv = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

interface IProps {
  className?: string;
  id?: string;
}

export const CalculatorScrollableContainer: React.FC<
  PropsWithChildren<IProps>
> = ({ children, id, className }) => {
  return (
    <ScrollableContainerDiv className={className}>
      <ScrollableContainer className={"scrollable-container"} id={id}>
        {children}
      </ScrollableContainer>
    </ScrollableContainerDiv>
  );
};
