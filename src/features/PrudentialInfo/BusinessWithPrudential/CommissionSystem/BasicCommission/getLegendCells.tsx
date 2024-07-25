import styled from "styled-components/macro";
import PruText from "../../../../../components/UI/PruText/PruText";

const Cell = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  align-content: center;
`;

export const getLegendCells = (from: number, to: number, suffix: string) => {
  const legend = [];
  for (let i = from; i < to + 1; i++) {
    legend.push(
      <Cell key={`cell${i}`}>
        <PruText fontSize={18}>{i % 5 ? "" : `${i} ${suffix}`}</PruText>
      </Cell>
    );
  }
  return legend;
};
