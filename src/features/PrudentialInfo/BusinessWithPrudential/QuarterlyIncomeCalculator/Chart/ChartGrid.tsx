import React, { ReactNode } from "react";
import styled from "styled-components/macro";

export interface IChartGridProps {
  children: ReactNode;
}

export const ChartGrid = (props: IChartGridProps) => {
  return <OuterDiv>{props.children}</OuterDiv>;
};

const OuterDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10%;
  margin: 0 20px;
  position: relative;
`;
