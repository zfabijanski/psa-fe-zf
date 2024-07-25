import React from "react";
import styled, { CSSProp } from "styled-components";
import { CodeTypes, TextTransformationCode } from "../Survey.types";

import { transformStringWithPattern } from "utils/formatters";
import { formatNumber } from "utils/transformers";
import ApprovalIcon from "components/UI/ApprovalIcon";
import { CurrencyInput } from "components/UI/CurrencyInput";
import { Input, IInputProps } from "components/UI/Input";
import { NumericInput } from "components/UI/NumericInput";

const isCurrency = (textSuffix?: string) =>
  ["zł", "PLN"].some(
    (currency) => currency.toUpperCase() === textSuffix?.toUpperCase()
  );

interface IProps extends IInputProps {
  type: CodeTypes;
  transformationCode: TextTransformationCode;
  textSuffix?: string;
  suffix?: React.ReactNode;
  css?: CSSProp;
}

const Container = styled.div<{ css?: CSSProp }>`
  display: flex;
  width: 100%;
  ${(props) => props.css};
`;

const Border = styled.div<Pick<IProps, "disabled">>`
  opacity: ${({ theme, disabled }) => (disabled ? theme.opacityDisabled : 1)};
  position: relative;
  width: 100%;
`;

export const SurveyInput = ({
  transformationCode,
  isApproved,
  value,
  onChange,
  textSuffix,
  type,
  allowedSignsRegex = /^\d+$/,
  disabled,
  placeholder,
  readOnly = false,
  labelProps,
  css,
}: IProps) => {
  const onBlur = () => {
    onChange(transformStringWithPattern(value.trim(), transformationCode));
  };

  const inputProps: IInputProps = {
    value,
    onChange,
    onBlur,
    readOnly,
    disabled,
    isApproved,
    placeholder,
    labelProps,
    hideEmptyValidations: true,
    allowedSignsRegex,
    textAlign: "center",
  };

  const renderInputByType = (type: CodeTypes, textSuffix?: string) => {
    if (isCurrency(textSuffix)) {
      return <CurrencyInput {...inputProps} />;
    }
    if (type === CodeTypes.Integer) {
      return (
        <NumericInput
          getFormattedValue={formatNumber}
          filledDesc={textSuffix}
          {...inputProps}
        />
      );
    }

    return <Input filledDesc={textSuffix} {...inputProps} />;
  };

  return (
    <Container css={css}>
      <Border disabled={disabled}>
        {isApproved && <ApprovalIcon />}
        {renderInputByType(type, textSuffix)}
      </Border>
    </Container>
  );
};

export default SurveyInput;
