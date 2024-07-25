import React, { FC } from "react";
import { IInputProps } from "./Input";
import { NumericInput } from "./NumericInput";

export const PercentInput: FC<IInputProps> = React.memo((props) => {
  const getFormattedValue = (value: string) => {
    return `${Number(value)}%`;
  };

  return (
    <NumericInput
      {...props}
      getFormattedValue={getFormattedValue}
      allowedSignsRegex={"^\\d{0,3}$"}
      textAlign="center"
    />
  );
});
