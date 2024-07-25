import React, { FC } from "react";
import { formatCurrency } from "../../utils/transformers";
import { ETextAlign, IInputProps } from "./Input";
import { NumericInput } from "./NumericInput";

export type ICurrencyInputProps = IInputProps & {
  intlFormatOptions?: Partial<
    Omit<Intl.NumberFormatOptions, "style" | "maximumFractionDigits">
  >;
  /** Adds two fractional digits. */
  fractional?: boolean;
};

export const CurrencyInput: FC<ICurrencyInputProps> = React.memo(
  ({ intlFormatOptions, fractional, allowedSignsRegex, ...restProps }) => {
    const defaultAllowedSignsRegex = fractional
      ? "(^$)|(^\\d+[,.]{0,1}\\d{0,2}$)"
      : "^\\d*$";

    const getFormattedValue = (value: string) => {
      const formattedValue = formatCurrency(value, {
        ...intlFormatOptions,
        minimumFractionDigits: fractional ? 2 : 0,
        maximumFractionDigits: fractional ? 2 : 0,
      });

      if (!value || isNaN(Number(value))) {
        return formattedValue.replace(/(\d|\.|,)/g, "").trim();
      }

      return formattedValue;
    };

    return (
      <NumericInput
        textAlign={ETextAlign.right}
        getFormattedValue={getFormattedValue}
        allowedSignsRegex={allowedSignsRegex || defaultAllowedSignsRegex}
        {...restProps}
      />
    );
  }
);
