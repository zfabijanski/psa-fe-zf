import React from "react";
import { MessageDescriptor } from "react-intl";
import { ICurrencyInputProps } from "../../../components/UI/CurrencyInput";
import { Frequency } from "../../../models/common";
import { CalculatorColWrapper } from "../components/CalculatorColWrapper";
import { CalculatorCurrencyInput } from "../components/CalculatorCurrencyInput";
import { IErrorMessageResolver } from "../errorMessageResolver";

interface ICurrencyInput
  extends Omit<ICurrencyInputProps, "onChange" | "value"> {
  value?: number;
  resolveErrorMessage?: IErrorMessageResolver;
  span: number;
  onSetFieldValue?: (name: string, value?: number) => void;
  digitsLimit?: number;
  min?: number;
  max?: number;
  frequency?: Frequency;
  tooltip?: string;
  error?: string;
  labelNode?: React.ReactNode;
  label?: string | MessageDescriptor;
  name?: string;
  outOfDate?: boolean;
}

export const CurrencyInput: React.FC<ICurrencyInput> = ({
  span,
  error,
  onSetFieldValue,
  ...props
}) => (
  <CalculatorColWrapper span={span}>
    <CalculatorCurrencyInput
      {...props}
      error={error}
      onSetFieldValue={onSetFieldValue}
      hasDarkBackground
    />
  </CalculatorColWrapper>
);
