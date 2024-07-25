import React, { useRef, useState } from "react";
import { useLayoutEffect } from "react";
import defer from "lodash/defer";
import styled, { css, CSSProp } from "styled-components/macro";
import { MessageDescriptor, useIntl } from "react-intl";
import { Icon, TIconType } from "./Icon";
import { Label, ILabelProps } from "./Label";
import { ValidationInfo } from "./ValidationInfo";
import { TypoSmallRegular } from "./typography";

export enum ETextAlign {
  center = "center",
  left = "left",
  right = "right",
}

export const getTextFromMixed = (mixed?: string | MessageDescriptor) =>
  mixed && (typeof mixed === "string" ? mixed : mixed.id);

export interface IFixedPlaceholderConfig {
  fixedPlaceholder: string;
  maskPattern: string;
  parseWithSeparators?: boolean;
}

export interface IInputProps {
  value: string;
  disabled?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  className?: string;
  inputType?: string;
  isInvalid?: boolean;
  isApproved?: boolean;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  onBlurInternal?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement> & (() => void);
  innerRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  allowedSignsRegex?: string | RegExp;
  autoComplete?: "off" | "on";
  disablePasting?: boolean;
  fixedPlaceholderConfig?: IFixedPlaceholderConfig;
  labelProps?: ILabelProps;
  textAlign?: keyof typeof ETextAlign;
  iconName?: TIconType;
  iconPosition?: "left" | "right";
  filledDesc?: string;
  hasDarkBackground?: boolean;
  hideEmptyValidations?: boolean;
  validationInfoCss?: CSSProp;
  name?: string;
  "data-testid"?: string;
}

export const Input: React.FC<IInputProps> = React.memo((props) => {
  const {
    value,
    disabled,
    autoFocus,
    className,
    inputType,
    isInvalid,
    isApproved,
    onChange,
    onFocus,
    onBlur,
    onBlurInternal,
    labelProps,
    innerRef,
    placeholder,
    allowedSignsRegex,
    disablePasting,
    autoComplete,
    textAlign,
    iconName,
    iconPosition,
    filledDesc,
    hasDarkBackground,
    hideEmptyValidations,
    readOnly,
    validationInfoCss,
    name,
  } = props;

  const intl = useIntl();
  const filledDescRef = useRef<HTMLDivElement>(null);
  const [hideCaret, setHideCaret] = useState(false);

  const CONFIG = props.fixedPlaceholderConfig;

  const stripPlaceholderChars = (str: string) => {
    if (!CONFIG) throw new Error("Missing config");

    const placeholderChars = Array.from(
      new Set(CONFIG.fixedPlaceholder.split(""))
    );
    return str
      .split("")
      .filter((char) => !placeholderChars.includes(char))
      .join("");
  };

  const formatValue = (value = "") => {
    if (!CONFIG) throw new Error("Missing config");

    const valueChars = stripPlaceholderChars(value).split("");
    const result = CONFIG.maskPattern
      .split("")
      .map((char, index) =>
        valueChars.length && char === "x"
          ? valueChars.shift()
          : CONFIG.fixedPlaceholder[index]
      )
      .join("");
    return result;
  };

  const [displayedValue, setDisplayedValue] = useState(
    CONFIG ? formatValue(value) : value
  );

  useLayoutEffect(() => {
    if (!CONFIG) return;
    setDisplayedValue(formatValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, CONFIG]);

  const parseValue = (formatedValue: string) => {
    if (!CONFIG) throw new Error("Missing config");

    return formatedValue.split("").reduce((acc, char, index) => {
      const shouldSkip = CONFIG.parseWithSeparators
        ? CONFIG.maskPattern[index] === "x" &&
          char === CONFIG.fixedPlaceholder[index]
        : CONFIG.maskPattern[index] !== "x" ||
          char === CONFIG.fixedPlaceholder[index];
      return shouldSkip ? acc : acc + char;
    }, "");
  };

  const [skipReset, setSkipReset] = useState(false);

  const getMaxIndex = (value: string) => {
    if (!CONFIG) throw new Error("Missing config");
    let counter = stripPlaceholderChars(value).length;
    return CONFIG.maskPattern.split("").reduce((acc, char) => {
      if (counter === 0) return acc;
      if (char === "x") counter--;
      return acc + 1;
    }, 0);
  };

  const resetSelectionRange = (
    e: React.SyntheticEvent<HTMLInputElement, Event>
  ) => {
    if (skipReset) {
      setSkipReset(false);
      return;
    }
    const input = e.target as EventTarget & HTMLInputElement;
    const index = Math.min(input.selectionEnd || 0, getMaxIndex(value));
    defer(() => input.setSelectionRange(index, index));
  };

  const getNextCaretPosition = (input: EventTarget & HTMLInputElement) => {
    let caretOffset = input.selectionEnd || 0;
    if (!CONFIG) return caretOffset;

    const inputValue = input.value;
    const parsed = parseValue(formatValue(inputValue));
    const firstMissIndex = inputValue
      .slice(0, CONFIG.maskPattern.length)
      .split("")
      .findIndex(
        (char, index) =>
          CONFIG.maskPattern[index] !== "x" &&
          char !== CONFIG.fixedPlaceholder[index]
      );
    if (
      firstMissIndex !== -1 &&
      inputValue.length >= CONFIG.maskPattern.length
    ) {
      let counter = caretOffset - firstMissIndex;
      const maskSlice = CONFIG.maskPattern.slice(firstMissIndex);
      const additionalOffset = maskSlice.split("").reduce((acc, char) => {
        if (counter <= 0) return acc;
        if (char === "x") {
          counter--;
          return acc;
        } else {
          return acc + 1;
        }
      }, 0);
      caretOffset += additionalOffset;
    }

    return Math.min(caretOffset, getMaxIndex(parsed));
  };

  const passedOnBlur = onBlurInternal
    ? onBlurInternal
    : (e: React.FocusEvent<HTMLInputElement>) => {
        const nextValue = CONFIG
          ? parseValue(formatValue(e.target.value))
          : e.target.value;
        return onBlur && onBlur(nextValue);
      };

  const preparedRegex = allowedSignsRegex && new RegExp(allowedSignsRegex, "u");
  const isFilledDescVisible = !!value;

  return (
    <Wrapper>
      {(labelProps?.labelTrKey || labelProps?.labelText) && (
        <Label
          {...labelProps}
          isInvalid={isInvalid}
          hasDarkBackground={hasDarkBackground}
        />
      )}
      <InputWrapper>
        <StyledInput
          name={name}
          value={CONFIG ? displayedValue : value || ""}
          disabled={disabled}
          autoFocus={autoFocus}
          readOnly={readOnly}
          type={inputType}
          isInvalid={isInvalid}
          isApproved={isApproved}
          maxLength={4000}
          hideCaret={hideCaret}
          textAlign={textAlign!}
          onChange={(e) => {
            setHideCaret(true);
            setSkipReset(true);

            const input = e.target;
            const caretPosition = getNextCaretPosition(input);

            const inputValue = e.target.value;
            const nextValue = CONFIG
              ? parseValue(formatValue(inputValue))
              : inputValue;

            if (!nextValue || !preparedRegex || preparedRegex.test(nextValue)) {
              onChange(nextValue);
              defer(() =>
                input.setSelectionRange(caretPosition, caretPosition)
              );
            } else {
              defer(() =>
                input.setSelectionRange(caretPosition - 1, caretPosition - 1)
              );
            }
            defer(() => setHideCaret(false));
          }}
          onSelect={CONFIG && resetSelectionRange}
          onBlur={passedOnBlur}
          onFocus={onFocus}
          autoComplete={autoComplete || (disablePasting ? "off" : "on")}
          onPaste={(e) => {
            if (!disablePasting) return true;
            e.preventDefault();
            return false;
          }}
          onDrop={(e) => {
            if (!disablePasting) return true;
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            if (!CONFIG) return;
            e.preventDefault();
            navigator.clipboard.writeText(value);
          }}
          ref={innerRef}
          className={className}
          placeholder={
            !disabled && placeholder
              ? intl.formatMessage({ id: placeholder })
              : ""
          }
          iconName={iconName}
          iconPosition={iconPosition}
          filledDescWidth={filledDescRef.current?.offsetWidth}
          isFilledDescVisible={isFilledDescVisible}
          data-testid={props["data-testid"]}
        />
        {iconName && (
          <StyledIcon
            width={20}
            name={iconName}
            color="gray60"
            iconPosition={iconPosition}
          />
        )}
        {filledDesc && (
          <FilledDesc ref={filledDescRef} isVisible={isFilledDescVisible}>
            {intl.formatMessage({ id: filledDesc })}
          </FilledDesc>
        )}
      </InputWrapper>
      {(!hideEmptyValidations ||
        !!labelProps?.validationInfoTrKeys?.length) && (
        <ValidationInfo
          withIcon={hasDarkBackground}
          textColor={hasDarkBackground ? "white100" : "error"}
          validations={labelProps?.validationInfoTrKeys}
          css={validationInfoCss}
        />
      )}
    </Wrapper>
  );
});

Input.defaultProps = {
  inputType: "text",
  textAlign: ETextAlign.left,
  iconPosition: "left",
};

const Wrapper = styled.label`
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{
  isInvalid?: boolean;
  isApproved?: boolean;
  hideCaret?: boolean;
  textAlign: keyof typeof ETextAlign;
  iconName?: string;
  iconPosition?: "left" | "right";
  filledDescWidth?: number;
  readOnly?: boolean;
  isFilledDescVisible?: boolean;
}>`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.newColors.white100};
  border-radius: 0;
  -webkit-appearance: none;
  border: 0;
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.newColors.gray30};
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ theme }) => theme.newColors.gray100};
  -webkit-text-fill-color: ${({ theme }) => theme.newColors.gray100};
  background-clip: padding-box;
  position: relative;
  transition-property: color, background-color, border-color, box-shadow;
  ${({ hideCaret }) => hideCaret && "caret-color: transparent;"}

  padding: 0 12px;
  ${({ iconName, iconPosition }) =>
    iconName && css`padding-${iconPosition}: 44px`};
  ${({ filledDescWidth, isFilledDescVisible }) =>
    filledDescWidth &&
    isFilledDescVisible &&
    css`
      padding-left: ${filledDescWidth}px;
    `};

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
    opacity: 1;
  }

  &:readonly {
    cursor: default;
    pointer-events: none;
  }

  ${({ isInvalid, theme }) =>
    isInvalid &&
    css`
      box-shadow: inset 0px 0px 0px 2px ${theme.newColors.error};
    `}

  ${({ isApproved, theme }) =>
    isApproved &&
    css`
      &,
      &:disabled {
        box-shadow: inset 0px 0px 0px 2px ${theme.newColors.primary80};
        background-color: ${theme.newColors.white100};
      }
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

const StyledIcon = styled(Icon)<{
  iconPosition?: "left" | "right";
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;

  ${({ iconPosition }) =>
    css`
      ${iconPosition}: 12px
    `};
`;

const FilledDesc = styled(TypoSmallRegular)<{ isVisible?: boolean }>`
  color: ${({ theme }) => theme.newColors.gray80};
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 12px;
  top: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      visibility: hidden;
      left: -9999px;
    `}
`;
