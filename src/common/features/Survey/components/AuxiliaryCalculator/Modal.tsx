import { FC } from "react";
import { createPortal } from "react-dom";
import { FocusOn } from "react-focus-on";
import styled from "styled-components";
import { Backdrop } from "components/UI/Backdrop";
import ExpensesCalculator from "./ExpensesCalculator";
import { IRow as IExpensesRow } from "./ExpensesCalculator/types";
import HealthProblemsCalculator from "./HealthProblemsCalculator";
import { IHealthProblemData } from "./HealthProblemsCalculator/types";
import NeedsCalculator from "./NeedsCalculator";
import { IRow as INeedsRow } from "./NeedsCalculator/types";
import { Calculator, CalculatorData } from "./types";

const ModalBody = styled.div<IDisplay>`
  display: ${({ display }) => display};
  position: fixed;
  z-index: 310;
  top: 0;
  left: 15%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  z-index: 320;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
`;

interface IDisplay {
  display: string;
}
interface IProps {
  isEnabled: boolean;
  type: Calculator;
  data: CalculatorData;
  onSave: (sum: number) => void;
  onCancel: () => void;
  validationPattern?: string | RegExp;
}

const Modal: FC<IProps> = (props) => {
  return (
    <div>
      {createPortal(
        <FocusOn enabled={props.isEnabled}>
          <ModalBody display={props.isEnabled ? "flex" : "none"}>
            <Container>
              {props.type === "needs" && (
                <NeedsCalculator
                  needs={props.data as INeedsRow[]}
                  onSave={props.onSave}
                  onCancel={props.onCancel}
                />
              )}
              {props.type === "expenses" && (
                <ExpensesCalculator
                  data={props.data as IExpensesRow[]}
                  onSave={props.onSave}
                  onCancel={props.onCancel}
                  validationPattern={props.validationPattern || ""}
                />
              )}
              {props.type === "healthProblems" && (
                <HealthProblemsCalculator
                  data={props.data as IHealthProblemData[]}
                  onSave={props.onSave}
                  onCancel={props.onCancel}
                />
              )}
            </Container>
            <Backdrop />
          </ModalBody>
        </FocusOn>,
        document.getElementById("modal") || document.body
      )}
    </div>
  );
};

export default Modal;
