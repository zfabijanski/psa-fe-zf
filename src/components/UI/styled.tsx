import styled, { css } from "styled-components/macro";

export const FormWrapper = styled.div`
  margin: 0 -6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const FormItemWrapper = styled.div<{
  size?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sizeResponsive?: {
    xl?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    sm?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    xs?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  };
  withoutMargin?: boolean;
}>`
  width: ${({ size }) => (size ? 8.33 * size : 100)}%;
  padding: 0 6px;
  display: inline-block;
  margin-bottom: ${({ withoutMargin }) => (withoutMargin ? 0 : 12)}px;

  ${({ theme, sizeResponsive }) =>
    sizeResponsive &&
    (Object.entries(sizeResponsive) as Array<[key: keyof typeof sizeResponsive, value: number]>).map(
      ([breakpoint, size]) => css`
        @media (max-width: ${theme.breakpoints[breakpoint]}px) {
          width: ${size * 8.33}%;
        }
      `
    )}
`;

export const Section = styled.div`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

export const ButtonsContainer = styled.div<{ justifyContent?: string; isGridItem?: boolean }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-end"};

  ${({ isGridItem }) =>
    isGridItem &&
    css`
      margin-top: 24px;
    `};

  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;

export const VerticalSpacer = styled.div<{ spacerHeight: string }>`
  height: ${({ spacerHeight }) => spacerHeight}px;
`;

export const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.newColors.gray30};
`;
