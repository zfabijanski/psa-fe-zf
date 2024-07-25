import React from "react";
import styled from "styled-components/macro";
import { AxisContainer } from "../../../commons/AxisContainer";

export const Axis = () => {
  return (
    <AxisContainer>
      <Container>
        <Arrow />
      </Container>
    </AxisContainer>
  );
};

const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

const Arrow = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.newColors.gray100};

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: solid;
    border-radius: 0;
    background-color: transparent;
    border-top: 5px solid transparent;
    border-left: 10px solid ${({ theme }) => theme.newColors.gray100};
    border-bottom: 5px solid transparent;
    border-right: none;
    top: -5px;
    right: -2px;
  }
`;
