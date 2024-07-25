import React from "react";
import styled, { css, CSSProp } from "styled-components/macro";
import { useIntl } from "react-intl";
import { IModalData } from "../../../models/Modal";
import { Icon } from "../Icon";
import { ModalInfoIcon } from "../ModalInfoIcon";
import { ILabelProps } from "../Label";
import { ValidationInfo } from "../ValidationInfo";

export enum ECheckboxType {
  regular = "regular",
  gridItem = "gridItem",
  calcTableItem = "calcTableItem",
  checkboxList = "checkboxList",
}

export interface ICheckboxProps extends IModalData {
  disabled?: boolean;
  checked?: boolean;
  isInvalid?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
  labelProps?: ILabelProps;
  onlyPresentation?: boolean;
  checkboxType?: keyof typeof ECheckboxType;
  hideValidationInfo?: boolean;
  name?: string;
  css?: CSSProp;
}

export const PruCheckbox: React.FC<ICheckboxProps> = (props) => {
  const intl = useIntl();

  return (
    <>
      <Wrapper
        checkboxType={props.checkboxType!}
        disabled={props.disabled}
        css={props.css}
      >
        <Input
          type="checkbox"
          disabled={props.disabled}
          checked={props.checked}
          name={props.name}
          onChange={(e) =>
            !props.disabled &&
            !props.onlyPresentation &&
            props.onChange?.(e.target.checked)
          }
        />
        <CheckMark
          role="checkbox"
          className={props.className}
          isInvalid={props.isInvalid}
          disabled={props.disabled}
          onClick={() =>
            !props.disabled &&
            !props.onlyPresentation &&
            props.onChange?.(!props.checked)
          }
          onlyPresentation={props.onlyPresentation}
          checked={props.checked}
        >
          <StyledIcon
            name="old-check-white"
            disabled={props.disabled}
            width={16}
            color="white100"
          />
        </CheckMark>

        {(props.labelProps?.labelTrKey || props.labelProps?.labelText) && (
          <CheckboxLabel
            disabled={props.disabled}
            onlyPresentation={props.onlyPresentation}
          >
            {props.labelProps.labelText ||
              (props.labelProps.labelTrKey
                ? intl.formatMessage({ id: props.labelProps.labelTrKey })
                : "")}
          </CheckboxLabel>
        )}

        {(props.labelProps?.modalContentTrKey || props.labelProps?.modalHtml) &&
          props.labelProps?.labelTrKey && (
            <StyledModalInfoIcon
              modalContentTrKey={props.labelProps.modalContentTrKey}
              modalContent={props.labelProps.modalContent}
              modalButtons={props.labelProps.modalButtons}
              modalHtml={props.labelProps.modalHtml}
              modalHtmlTrValues={props.labelProps.modalHtmlTrValues}
            />
          )}
      </Wrapper>
      {props.checkboxType !== ECheckboxType.checkboxList &&
        !props.hideValidationInfo && (
          <ValidationInfo
            validations={props.labelProps?.validationInfoTrKeys}
          />
        )}
    </>
  );
};

PruCheckbox.defaultProps = {
  checkboxType: ECheckboxType.regular,
};

const Wrapper = styled.div<{
  checkboxType: keyof typeof ECheckboxType;
  disabled?: boolean;
  css?: CSSProp;
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  ${({ checkboxType }) =>
    checkboxType !== ECheckboxType.checkboxList &&
    css`
      position: relative;
    `};

  ${({ checkboxType, theme, disabled }) =>
    (checkboxType === ECheckboxType.gridItem ||
      checkboxType === ECheckboxType.calcTableItem) &&
    css`
      display: flex;
      border: 1px solid ${theme.newColors.gray30};
      background-color: ${disabled
        ? theme.newColors.gray10
        : theme.newColors.white100};
      height: 52px;
      padding: 0 14px;
    `};

  ${({ checkboxType }) =>
    checkboxType === ECheckboxType.gridItem &&
    css`
      margin-top: 24px;
    `};

  ${(props) => props.css};
`;

const CheckMark = styled.div<{
  disabled?: boolean;
  isInvalid?: boolean;
  onlyPresentation?: boolean;
  checked?: boolean;
}>`
  width: 24px;
  min-width: 24px;
  height: 24px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  cursor: ${({ disabled, onlyPresentation }) => {
    if (disabled) return "not-allowed";
    if (onlyPresentation) return "default";
    return "pointer";
  }};

  ${({ theme, disabled, onlyPresentation, checked, isInvalid }) => {
    if (!checked) {
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

        case onlyPresentation:
          return css`
            background-color: ${theme.newColors.primary05};
            border-color: ${theme.newColors.primary80};
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
          background-color: ${theme.newColors.gray60};
          border-color: ${theme.newColors.gray60};
        `;

      case isInvalid:
        return css`
          background-color: ${theme.newColors.error};
          border-color: ${theme.newColors.error};
        `;

      default:
        return css`
          background-color: ${theme.newColors.gray100};
          border-color: ${theme.newColors.gray100};
        `;
    }
  }}
`;

const StyledIcon = styled(Icon)<{ disabled?: boolean }>`
  visibility: hidden;
`;

const Input = styled.input`
  display: none;

  &:checked + ${CheckMark} ${StyledIcon} {
    visibility: initial;
  }
`;

const CheckboxLabel = styled.span<{
  disabled?: boolean;
  onlyPresentation?: boolean;
}>`
  font-size: 16px;
  line-height: 20px;
  ${({ theme, disabled, onlyPresentation }) =>
    (disabled || onlyPresentation) &&
    css`
      color: ${theme.newColors.gray60};
    `};
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 10px;
  position: relative;
  z-index: 1;
`;

export default PruCheckbox;
