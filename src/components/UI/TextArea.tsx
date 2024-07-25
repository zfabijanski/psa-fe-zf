import React from "react";
import styled, { css } from "styled-components/macro";
import { Label, ILabelProps } from "./Label";
import { ValidationInfo } from "./ValidationInfo";

export interface ITextAreaProps {
  value: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  isInvalid?: boolean;
  isApproved?: boolean;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement> & (() => void);
  placeholder?: string;
  labelProps?: ILabelProps;
  hideEmptyValidations?: boolean;
  readOnly?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    const {
      value,
      disabled,
      autoFocus,
      className,
      isApproved,
      isInvalid,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      labelProps,
      hideEmptyValidations,
      ...rest
    } = props;

    return (
      <Wrapper>
        <Label {...labelProps} />
        <StyledTextArea
          value={value || ""}
          disabled={disabled}
          autoFocus={autoFocus}
          isApproved={isApproved}
          isInvalid={isInvalid}
          maxLength={4000}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
          onFocus={onFocus}
          className={className}
          ref={ref}
          placeholder={!disabled ? placeholder : ""}
          {...rest}
        />
        {(!hideEmptyValidations ||
          !!labelProps?.validationInfoTrKeys?.length) && (
          <ValidationInfo validations={labelProps?.validationInfoTrKeys} />
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.label`
  display: block;
`;

const StyledTextArea = styled.textarea<{
  isInvalid?: boolean;
  isApproved?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  height: 84px;
  min-height: 84px;
  display: block;
  background: ${({ theme, disabled, isApproved }) =>
    disabled && !isApproved
      ? theme.newColors.gray10
      : theme.newColors.white100};
  border: 0;
  color: ${({ theme }) => theme.newColors.gray100};
  -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray100};
  background-clip: padding-box;
  position: relative;
  resize: none;
  padding: 12px;
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.newColors.gray30};

  &::placeholder {
    color: ${({ theme }) => theme.newColors.gray60};
    -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray60};
    opacity: 1;
  }

  &:disabled {
    color: ${({ theme }) => theme.newColors.gray80};
    -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray80};
    background: ${({ theme }) => theme.newColors.gray10};
    cursor: not-allowed;
  }

  ${({ isApproved, theme }) =>
    isApproved &&
    css`
      boxshadow: inset 0px 0px 0px 2px ${theme.newColors.primary80};
    `}

  ${({ isInvalid, theme }) =>
    isInvalid &&
    css`
      box-shadow: inset 0px 0px 0px 2px ${theme.newColors.error};
    `}

  &:hover:not(:focus):not(:disabled) {
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.newColors.primary80};
  }

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.newColors.gray100};
    outline: 0;
  }
`;
