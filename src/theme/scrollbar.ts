import { css } from "styled-components";

export const darkGrayScrollbar = css`
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.transparent};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.darkGray};
  }

  scrollbar-color: ${({ theme }) =>
    `${theme.colors.darkGray} ${theme.colors.transparent}`};
`;

export const narrowYScrollbar = css`
  ::-webkit-scrollbar {
    width: 6px;
  }

  scrollbar-width: thin;
`;

export const narrowXScrollbar = css`
  ::-webkit-scrollbar {
    height: 6px;
  }

  scrollbar-height: thin;
`;
