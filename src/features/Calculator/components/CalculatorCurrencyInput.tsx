import React, { useEffect, useMemo, useState } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import styled from "styled-components";
import {
  CurrencyInput,
  ICurrencyInputProps,
} from "../../../components/UI/CurrencyInput";
import { IDataEntry } from "../../../components/UI/helpersUI";
import { getTextFromMixed, IInputProps } from "../../../components/UI/Input";
import { Frequency } from "../../../models/common";
import {
  formatErrorMessage,
  IErrorMessageResolver,
} from "../errorMessageResolver";
import { getResolveParameter } from "../utils";
import { localizeNumber } from "utils/locale";

const StyledCurrencyInput = styled(CurrencyInput)`
  width: 100%;
`;

export interface CalculatorCurrencyInputProps
  extends Omit<ICurrencyInputProps, "onChange" | "value">,
    Pick<
      IInputProps,
      "hasDarkBackground" | "hideEmptyValidations" | "filledDesc"
    >,
    IDataEntry {
  name?: string;
  value?: number;
  resolveErrorMessage?: IErrorMessageResolver;
  onSetFieldValue?: (name: string, value?: number) => void;
  digitsLimit?: number;
  min?: number;
  max?: number;
  frequency?: Frequency;
  tooltip?: string;
  overrideValidation?: {
    error?: string;
    name: string;
    min?: number;
    max?: number;
  };
  hideValidationMessage?: boolean;
  label?: string | MessageDescriptor;
  labelNode?: React.ReactNode;
  outOfDate?: boolean;
}

/** @deprecated This component should be removed in the next refactor. */
export const CalculatorCurrencyInput: React.FC<
  CalculatorCurrencyInputProps
> = ({
  onSetFieldValue,
  error,
  resolveErrorMessage,
  min,
  max,
  tooltip,
  label,
  labelNode,
  outOfDate,
  digitsLimit,
  hasDarkBackground,
  hideEmptyValidations,
  filledDesc,
  overrideValidation,
  hideValidationMessage,
  value: propValue,
  ...props
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const intl = useIntl();

  useEffect(() => {
    setValue(toString(propValue));
  }, [propValue]);

  const handleInputBlur = (val?: string) => {
    const numberValue = localizeNumber(val);
    const parsedValue = isNaN(numberValue) ? undefined : numberValue;

    if (!!onSetFieldValue && !!props.name) {
      onSetFieldValue(props.name, parsedValue);
      setValue(toString(parsedValue)); // This ensures that the internal value and prop value are in sync.
    }
  };

  const handleInputChange = (val?: string) => {
    const isFractional = val?.includes(",") || val?.includes(".");
    // For fractional inputs we need to limit the number of maximum characters.
    const maxValueLength =
      isFractional && digitsLimit ? digitsLimit + 3 : digitsLimit;

    if (!maxValueLength || !(val && val.length > maxValueLength)) {
      setValue(val);
      if (outOfDate) handleInputBlur(val);
    }
  };

  const errorMsg = useMemo(() => {
    if (resolveErrorMessage) {
      if (overrideValidation && overrideValidation.error) {
        return formatErrorMessage(
          intl,
          resolveErrorMessage(
            overrideValidation.error,
            overrideValidation.name,
            getResolveParameter(
              overrideValidation.name,
              overrideValidation.min,
              overrideValidation.max,
              props.frequency
            )
          )
        );
      }
      if (error && props.name) {
        return formatErrorMessage(
          intl,
          resolveErrorMessage(
            error,
            props.name,
            getResolveParameter(props.name, min, max, props.frequency)
          )
        );
      }
    }
    return outOfDate && value
      ? intl.formatMessage({
          id: `calculator.outdatedFieldTooltip`,
        })
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, outOfDate, min, max, props.frequency, value, overrideValidation]);

  return (
    <>
      <StyledCurrencyInput
        value={outOfDate || !value ? "" : value}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        labelProps={{
          labelText: labelNode,
          labelTrKey: getTextFromMixed(label),
          modalContentTrKey: tooltip,
          validationInfoTrKeys:
            (error || overrideValidation?.error) &&
            errorMsg &&
            !hideValidationMessage
              ? [{ trKey: errorMsg as string }]
              : [],
        }}
        isInvalid={!!error && !overrideValidation}
        disabled={props.readOnly}
        hasDarkBackground={hasDarkBackground}
        hideEmptyValidations={hideEmptyValidations || hideValidationMessage}
        placeholder={getTextFromMixed(props.placeholder)}
        filledDesc={filledDesc}
        {...props}
      />
    </>
  );
};

const toString = (value?: number) =>
  value !== undefined ? value.toString() : undefined;
