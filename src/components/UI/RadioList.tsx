import React from "react";
import styled, { css } from "styled-components/macro";
import { useIntl } from "react-intl";
import { Input } from "./Input";
import { Label, ILabelProps } from "./Label";
import { ModalInfoIcon } from "./ModalInfoIcon";
import { ValidationInfo, EValidationInfoSize } from "./ValidationInfo";

export interface IRadioListProps {
  disabled?: boolean;
  isInvalid?: boolean;
  value?: string;
  options: {
    value: string;
    allowedSignsRegex?: string;
    labelTrKey: string;
    hasAdditionalValue?: boolean;
    inputPlaceholder?: string;
    isInvalid?: boolean;
    inputLabelProps?: ILabelProps;
    hint?: string;
  }[];
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  labelProps: ILabelProps;
}

export const RadioList: React.FC<IRadioListProps> = (props) => {
  const intl = useIntl();

  const [selectedOptionValue, additionalValue] = props.value?.split("|") || [];

  return (
    <div className={props.className}>
      {props.labelProps.labelTrKey && <StyledLabel {...props.labelProps} />}
      {props.isInvalid && (
        <StyledValidationInfo
          size={EValidationInfoSize.body}
          withIcon
          validations={props.labelProps?.validationInfoTrKeys}
        />
      )}
      <OptionsWrapper role="radiogroup">
        {props.options?.map((option) => {
          const isOptionSelected = option.value === selectedOptionValue;

          return (
            <Option
              key={option.value}
              onClick={() =>
                !props.disabled &&
                !isOptionSelected &&
                props.onChange(option.value)
              }
              hasAdditionalValue={!!option.hasAdditionalValue}
              disabled={props.disabled}
              hasOptionHint={!!option.hint}
            >
              <RadioMark
                selected={isOptionSelected}
                disabled={props.disabled}
                isInvalid={option.isInvalid || props.isInvalid}
              />
              <OptionText disabled={props.disabled}>
                {intl.formatMessage({ id: option.labelTrKey })}
                {option.hasAdditionalValue && (
                  <div>
                    <StyledInput
                      value={isOptionSelected ? additionalValue || "" : ""}
                      allowedSignsRegex={option.allowedSignsRegex}
                      isInvalid={option.isInvalid}
                      onChange={(val) =>
                        props.onChange(`${option.value}|${val || ""}`)
                      }
                      onBlur={(val) => props.onBlur && props.onBlur()}
                      labelProps={option.inputLabelProps}
                      disabled={props.disabled}
                      hasOptionHint={!!option.hint}
                    />
                  </div>
                )}
              </OptionText>
              {option.hint && (
                <OptionModalIcon modalContentTrKey={option.hint} />
              )}
            </Option>
          );
        })}
      </OptionsWrapper>
    </div>
  );
};

const StyledLabel = styled(Label)`
  margin-bottom: 8px;
`;

const StyledValidationInfo = styled(ValidationInfo)`
  margin-bottom: 16px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Option = styled.div<{
  hasAdditionalValue: boolean;
  disabled?: boolean;
  hasOptionHint: boolean;
}>`
  display: inline-flex;
  align-items: flex-start;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  ${({ hasAdditionalValue, hasOptionHint }) =>
    hasAdditionalValue &&
    css`
      width: calc(100% - ${hasOptionHint ? 24 : 0}px);
    `};
`;

const RadioMark = styled.div<{
  selected: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
}>`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  ${({ theme, disabled, selected, isInvalid }) => {
    if (!selected) {
      switch (true) {
        case disabled:
          return css`
            background-color: ${theme.newColors.gray10};
            border-color: ${theme.newColors.gray60};
          `;

        case isInvalid:
          return css`
            background-color: ${theme.newColors.primary05};
            border-color: ${theme.newColors.error};

            &:hover {
              background-color: ${theme.newColors.primary20};
              border-color: ${theme.newColors.primary100};
            }
          `;

        default:
          return css`
            background-color: ${theme.newColors.primary05};
            border-color: ${theme.newColors.primary80};

            &:hover {
              background-color: ${theme.newColors.primary20};
              border-color: ${theme.newColors.primary100};
            }
          `;
      }
    }

    switch (true) {
      case disabled:
        return css`
          background-color: ${theme.newColors.white100};
          border-color: ${theme.newColors.gray60};
          border-width: 7px;
        `;

      case isInvalid:
        return css`
          background-color: ${theme.newColors.white100};
          border-color: ${theme.newColors.error};
          border-width: 7px;
        `;

      default:
        return css`
          background-color: ${theme.newColors.white100};
          border-color: ${theme.newColors.gray100};
          border-width: 7px;
        `;
    }
  }}
`;

const OptionText = styled.div<{ disabled?: boolean }>`
  flex: 1;
  margin-top: 2px;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.newColors.gray60};
    `};
`;

const StyledInput = styled(Input)<{ hasOptionHint: boolean }>`
  margin: 9px 0 2px;

  ${({ hasOptionHint }) =>
    hasOptionHint &&
    css`
      width: calc(100% + 24px);
    `};
`;

const OptionModalIcon = styled(ModalInfoIcon)`
  margin-left: 8px;
  position: absolute;
  top: 3px;
  left: 100%;
`;
