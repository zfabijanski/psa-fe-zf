import React from "react";
import styled from "styled-components/macro";
import TextContainer from "../../commons/TextContainer";
import Chart from "./Chart";
import { legendData } from "./data";
import { LegendColor } from "./types";

export interface IVisualisationProps {
  showReserveLegend: boolean;
}

const Visualization = (props: IVisualisationProps) => {
  return (
    <Container>
      <Chart />
      <Legend>
        {legendData
          .filter((elt) => {
            if (!props.showReserveLegend) {
              return elt.color !== LegendColor.LightGray;
            }
            return true;
          })
          .map((elt) => (
            <Li key={elt.text} dotColor={elt.color}>
              <TextContainer
                fontWeight={"600"}
                fontSize={16}
                translationKey={elt.text}
              />
            </Li>
          ))}
      </Legend>
    </Container>
  );
};

export default Visualization;

const Container = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr;
  border-left: ${({ theme }) => `2px dashed ${theme.colors.lightGray};`};

  @media only screen and (max-width: 1280px) {
    height: 360px;
  }

  @media only screen and (max-width: 1024px) {
    height: auto;
  }
`;

const Legend = styled.ul`
  list-style: none;
  color: ${({ theme }) => theme.newColors.gray100};

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 16px;
    }
    margin-bottom: 0px;
  }

  @media only screen and (max-width: 1024px) {
    span {
      font-size: 15px;
    }
  }
`;

const Li = styled.li<{ dotColor: LegendColor }>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    left: -25px;
    top: 5px;
    background-color: ${({ dotColor }) => dotColor};
  }
`;
