import styled, { CSSProp } from "styled-components";
import { Theme } from "../../theme/theme";

export interface BoxProps {
  css?: CSSProp | ((theme: Theme) => CSSProp);
}

export const Box = styled.div<BoxProps>`
  ${(props) =>
    typeof props.css === "function" ? props.css(props.theme) : props.css};
`;

export const Flex = styled(Box)`
  display: flex;
`;
