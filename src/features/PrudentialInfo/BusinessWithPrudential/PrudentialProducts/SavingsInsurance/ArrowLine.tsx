import React, { FC } from "react";
import styled from "styled-components/macro";
import Arrow from "../../../commons/Arrow";

const Container = styled.div`
  height: 10px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  height: 1px;
  width: calc(100% - 2px);
  background-color: ${({ theme }) => theme.newColors.gray100};
`;

const Circle = styled.div`
  position: absolute;
  left: auto;
  right: auto;
  top: 1px;
  border: 2px solid ${({ theme }) => theme.newColors.primary100};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.newColors.white100};
`;

const ArrowLine: FC = () => {
  return (
    <Container>
      <Arrow direction={"left"} />
      <Line />
      <Circle />
      <Arrow direction={"right"} />
    </Container>
  );
};

export default ArrowLine;
