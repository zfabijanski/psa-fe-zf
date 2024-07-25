import React, { Component } from "react";
import styled from "styled-components";
import SurveyInput from "../SurveyInput";
import { IAnswerFull } from "../../Survey.types";
import PruIcon from "components/UI/PruIcon/PruIcon";
import { IRow as IExpensesRow } from "./ExpensesCalculator/types";
import Modal from "./Modal";
import { IRow as INeedsRow } from "./NeedsCalculator/types";

interface IProps {
  type: "needs" | "expenses";
  data: INeedsRow[] | IExpensesRow[];
  onChange: (answerCode: string) => (newValue: string) => void;
  setOpen: (isOpen: boolean) => void;
  status: IAnswerFull;
  disabled: boolean;
  isCalculatorVisible: boolean;
}

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CalculatorIcon = styled(PruIcon)<Pick<IProps, "disabled">>`
  position: absolute;
  margin-left: 37px;
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const CalculatorIconContainer = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: ${({ theme }) => theme.opacityHover};
  }
`;

class CalculatorContainer extends Component<IProps> {
  public onSave = (sum: number) => {
    this.props.setOpen(false);
    this.props.onChange(this.props.status.code)(sum.toString(10));
  };

  private handleModalDismiss = () => {
    this.props.setOpen(false);
  };

  private handleCalculatorClick = () => {
    if (!this.props.disabled) {
      this.props.setOpen(true);
    }
  };

  public render() {
    const isEnabled = !this.props.disabled && this.props.isCalculatorVisible;
    return (
      <>
        <Modal
          isEnabled={isEnabled}
          type={this.props.type}
          data={this.props.data}
          onSave={this.onSave}
          onCancel={this.handleModalDismiss}
          validationPattern={this.props.status.validationPattern}
        />

        <QuestionContainer>
          <div>
            <SurveyInput
              value={this.props.status.value}
              type={this.props.status.type}
              disabled={this.props.disabled}
              isApproved={this.props.status.isApproved}
              textSuffix={this.props.status.answer_sufix}
              onChange={this.props.onChange(this.props.status.code)}
              allowedSignsRegex={this.props.status.validationPattern}
              transformationCode={this.props.status.text_transform_code}
              placeholder={"Suma"}
            />
          </div>
          <CalculatorIconContainer>
            <CalculatorIcon
              type="calculator"
              onClick={this.handleCalculatorClick}
              disabled={this.props.disabled}
            />
          </CalculatorIconContainer>
        </QuestionContainer>
      </>
    );
  }
}

export default React.memo(CalculatorContainer);
