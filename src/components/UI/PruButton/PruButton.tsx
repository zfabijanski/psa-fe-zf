import React from "react";
import styled, { CSSProp } from "styled-components/macro";
import { theme } from "../../../theme/theme";
import { Icon, TIconType, setIconColor } from "../Icon";

export type PruButtonType = keyof typeof config.color.default;

export interface IButtonProps {
  size?: "large" | "medium" | "small";
  buttonType?: PruButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  css?: CSSProp;
  icon?: TIconType | null;
  iconPosition?: "left" | "right";
}
const defaultProps: IButtonProps = {
  size: "large",
  buttonType: "primary",
};

export const PruButton: React.FC<Partial<IButtonProps>> = ({
  htmlType = "button",
  children,
  icon,
  iconPosition = "left",
  ...props
}) => (
  <StyledButton type={htmlType} {...defaultProps} {...props}>
    {!!icon && iconPosition !== "right" && (
      <StyledIcon position="left" name={icon} />
    )}
    {children}
    {!!icon && iconPosition === "right" && (
      <StyledIcon position="right" name={icon} />
    )}
  </StyledButton>
);

const StyledButton = styled.button<IButtonProps>`
  text-decoration: none;
  outline: 0px;
  cursor: pointer;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 128px;
  max-width: 400px;
  height: ${({ size }) => config.height[size!]};
  padding-left: ${({ size }) => config.padding[size!]};
  padding-right: ${({ size }) => config.padding[size!]};

  font-size: ${({ size }) => config.fontSize[size!]};
  font-weight: 700;
  line-height: 20px;
  text-align: center;

  color: ${({ buttonType }) => config.color.default[buttonType!]};
  background-color: ${({ buttonType }) =>
    config.backgroundColor.default[buttonType!]};
  border: 2px solid
    ${({ buttonType }) => config.borderColor.default[buttonType!]};
  ${({ buttonType }) => setIconColor(config.color.default[buttonType!])};

  &:hover {
    color: ${({ buttonType }) => config.color.hover[buttonType!]};
    background-color: ${({ buttonType }) =>
      config.backgroundColor.hover[buttonType!]};
    border: 2px solid
      ${({ buttonType }) => config.borderColor.hover[buttonType!]};
    ${({ buttonType }) => setIconColor(config.color.hover[buttonType!])};
  }

  &:disabled {
    cursor: initial;
    color: ${({ buttonType }) => config.color.disabled[buttonType!]};
    background-color: ${({ buttonType }) =>
      config.backgroundColor.disabled[buttonType!]};
    border: 2px solid
      ${({ buttonType }) => config.borderColor.disabled[buttonType!]};
    ${({ buttonType }) => setIconColor(config.color.disabled[buttonType!])};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${(props) => props.css};
`;

const StyledIcon = styled(Icon)<{ position: "left" | "right" }>`
  margin-right: ${({ position }) => (position === "left" ? "12px" : "-4px")};
  margin-left: ${({ position }) => (position === "right" ? "12px" : "-4px")};
`;

const { newColors } = theme;

const config = {
  height: {
    large: "52px",
    medium: "44px",
    small: "28px",
  },
  padding: {
    large: "32px",
    medium: "32px",
    small: "24px",
  },
  fontSize: {
    large: "16px",
    medium: "16px",
    small: "14px",
  },
  color: {
    default: {
      primary: newColors.white100,
      primaryBlack: newColors.white100,
      secondary: newColors.grayDark,
      error: newColors.white100,
    },
    hover: {
      primary: newColors.white100,
      primaryBlack: newColors.white100,
      secondary: newColors.primary100,
      error: newColors.white100,
    },
    disabled: {
      primary: newColors.white100,
      primaryBlack: newColors.gray5,
      secondary: newColors.gray60,
      error: newColors.white100,
    },
  },
  backgroundColor: {
    default: {
      primaryBlack: newColors.grayDark,
      primary: newColors.primary100,
      secondary: newColors.white100,
      error: newColors.error,
    },
    hover: {
      primary: newColors.grayDark,
      primaryBlack: newColors.primary100,
      secondary: newColors.white100,
      error: newColors.error,
    },
    disabled: {
      primary: newColors.inactive,
      primaryBlack: newColors.gray60,
      secondary: newColors.gray10,
      error: newColors.error,
    },
  },
  borderColor: {
    default: {
      primary: newColors.primary100,
      primaryBlack: newColors.grayDark,
      secondary: newColors.gray30,
      error: newColors.error,
    },
    hover: {
      primary: newColors.grayDark,
      primaryBlack: newColors.primary100,
      secondary: newColors.primary100,
      error: newColors.error,
    },
    disabled: {
      primary: newColors.inactive,
      primaryBlack: newColors.gray60,
      secondary: newColors.gray30,
      error: newColors.error,
    },
  },
};

export default PruButton;
