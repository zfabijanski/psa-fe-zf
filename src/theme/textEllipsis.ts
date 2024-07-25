import styled, { css } from "styled-components";

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TextEllipsis = styled.div`
  ${textEllipsis};
`;
