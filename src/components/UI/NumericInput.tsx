import React, { FC, useState } from "react";
import { IInputProps, Input } from "./Input";

export interface INumericInputProps extends IInputProps {
  getFormattedValue: (value: string) => string;
}

export const NumericInput: FC<INumericInputProps> = React.memo((props) => {
  const { autoFocus, value, onFocus, onBlur, getFormattedValue } = props;
  const [isInputFocused, setIsInputFocused] = useState(!!autoFocus);

  const getSelectedValue = (
    value: INumericInputProps["value"],
    formatValue: INumericInputProps["getFormattedValue"]
  ) => {
    if (value === "" || isNaN(Number(value)) || [",", "."].includes(value[0])) {
      return value;
    }
    if (isInputFocused) {
      let focusedValue = value.replace(".", ",");

      // Add 0 to the end of the number if it ends with a dot or comma. We receive one digit from the backend.
      if (new RegExp(/(\.|,)\d$/).test(focusedValue)) {
        focusedValue += "0";
      }
      return focusedValue;
    }
    return formatValue(value);
  };

  return (
    <Input
      autoComplete="off"
      {...props}
      value={getSelectedValue(value, getFormattedValue)}
      onFocus={() => {
        setIsInputFocused(true);
        onFocus && onFocus();
      }}
      onBlur={(val) => {
        setIsInputFocused(false);
        onBlur && onBlur(val);
      }}
    />
  );
});
