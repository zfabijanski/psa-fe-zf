import React from "react";
import styled from "styled-components";
import ScrollableContainer from "components/UI/ScrollableContainer/ScrollableContainer";
import CloseIcon from "../CloseIcon";
import ModalFooter from "../ModalFooter";
import CalculatorRow from "./Row";
import { IRow } from "./types";

interface IProps {
  needs: IRow[];
  onSave: (sum: number) => void;
  onCancel: () => void;
}

const CenteredScrollableContainer = styled(ScrollableContainer)`
  text-align: center;
`;

const Container = styled.div`
  user-select: none;
  display: inline-block;
  padding: 50px;
`;

const Calculator = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NeedsCalculator: React.FC<IProps> = (props) => {
  const getInitialState = () => Array(props.needs.length).fill(null);
  const [rows, setRows] = React.useState(getInitialState());

  const clickHandler = (rowIdx: number) => (selectedNum: number) =>
    setRows(
      rows.map((row, index) => {
        if (index === rowIdx) {
          return row !== selectedNum ? selectedNum : null;
        } else {
          return row;
        }
      })
    );

  const getSum = () =>
    rows.reduce((acc, num, index) => {
      if (num !== null) {
        acc += props.needs[index].products[num].cost;
      }
      return acc;
    }, 0);

  const handleSave = () => props.onSave(getSum());

  const handleCancel = () => {
    setRows(getInitialState());
    props.onCancel();
  };

  return (
    <Calculator>
      <CloseIcon handleCancel={handleCancel} />
      <CenteredScrollableContainer overflowX="auto">
        <Container>
          {props.needs.map((row, index) => (
            <CalculatorRow
              key={index}
              row={row}
              selected={rows[index]}
              onClick={clickHandler(index)}
            />
          ))}
        </Container>
      </CenteredScrollableContainer>
      <ModalFooter onSave={handleSave} sum={getSum()} />
    </Calculator>
  );
};

export default NeedsCalculator;
