import styled, { CSSProp } from "styled-components/macro";

export interface APKTitleProps {
  css?: CSSProp;
  fontSize?: string | number;
  lineHeight?: string | number;
}

export const APKTitle = styled.h2<APKTitleProps>`
  color: ${(props) => props.theme.newColors.gray100};
  font-size: ${(props) => props.fontSize ?? "32px"};
  line-height: ${(props) => props.lineHeight ?? "40px"};
  font-weight: 600;
  ${(props) => props.css};
`;

export const APKTitleBold = styled.span`
  color: ${(props) => props.theme.newColors.primary100};
`;
