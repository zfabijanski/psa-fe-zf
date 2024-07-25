import { TypoBodyRegular } from "components/UI/typography";
import React from "react";
import styled from "styled-components";

interface IProps {
  isAdequate?: boolean | null;
  children: React.ReactNode;
  textAlign?: "left" | "right";
}

const Text = styled((props: IProps) => {
  const { children, isAdequate, ...rest } = props;
  return <TypoBodyRegular {...rest}>{children}</TypoBodyRegular>;
})`
  color: ${({ isAdequate }) => {
    switch (isAdequate) {
      case true:
        return ({ theme }) => theme.newColors.success;
      case false:
        return ({ theme }) => theme.newColors.error;
      default:
        return ({ theme }) => theme.newColors.gray100;
    }
  }};
  font-size: 14px;
  line-height: 20px;
  height: 15px;
  margin: 1px 0 1px !important;
  display: flex;
  flex-direction: ${({ textAlign }) =>
    textAlign === "right" ? "row-reverse" : "row"}; !important;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
`;

export default Text;
