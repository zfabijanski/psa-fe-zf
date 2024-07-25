import React from "react";
import styled from "styled-components";
import ScrollableContainer from "components/UI/ScrollableContainer/ScrollableContainer";
import CloseIcon from "../CloseIcon";
import ModalFooter from "../ModalFooter";
import Row from "./Row";
import { IRow } from "./types";

interface IProps {
  data: IRow[];
  validationPattern: string | RegExp;
  onSave: (sum: number) => void;
  onCancel: () => void;
}

const CenteredScrollableContainer = styled(ScrollableContainer)`
  text-align: center;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Calculator = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ExpensesCalculator: React.FC<IProps> = (props) => {
  const [rows, setRows] = React.useState(
    props.data.map((elt) => ({
      header: elt.header,
      suffix: elt.suffix,
      index: elt.index,
      isActive: false,
      value: "",
    }))
  );

  const setValue = (index: number) => (newValue: string) => {
    setRows(
      rows.map((elt) => {
        if (elt.index === index) {
          return {
            ...elt,
            value: newValue.split(" ").join(""),
            isActive: newValue !== "",
          };
        }
        return elt;
      })
    );
  };

  const handleCancel = () => {
    setRows(rows.map((elt) => ({ ...elt, value: "", isActive: false })));
    props.onCancel();
  };

  const handleSave = () => props.onSave(getSum());

  const getSum = () =>
    rows.reduce((acc, elt) => {
      acc += elt.value === "" ? 0 : parseInt(elt.value, 10);
      return acc;
    }, 0);

  return (
    <Calculator>
      <CloseIcon handleCancel={handleCancel} />
      <CenteredScrollableContainer overflowX="auto">
        <Container>
          {rows.map((elt) => (
            <Row
              key={elt.header}
              header={elt.header}
              suffix={elt.suffix}
              isActive={elt.isActive}
              value={elt.value}
              setValue={setValue(elt.index)}
              validationPattern={"^((?!(0))\\d{0,8})$|^(0{0,1})$"}
            />
          ))}
        </Container>
      </CenteredScrollableContainer>
      <ModalFooter onSave={handleSave} sum={getSum()} />
    </Calculator>
  );
};

export default ExpensesCalculator;
