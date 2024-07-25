import { Box } from "components/UI/Box";
import styled from "styled-components";

export type LayoutItemProps = {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  marginBottom?: number;
};

export const LayoutWrapper = styled(Box)`
  padding: 16px calc(48px - 6px) 0;
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
`;

export const LayoutItem = styled(Box)<LayoutItemProps>`
  width: ${({ size }) => (size ? `${size * 8.3333}%` : "100%")};
  margin-bottom: ${({ marginBottom = 12 }) => marginBottom}px;
  padding-left: 6px;
  padding-right: 6px;
`;

export const LayoutItemFlex = styled(LayoutItem)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
`;
