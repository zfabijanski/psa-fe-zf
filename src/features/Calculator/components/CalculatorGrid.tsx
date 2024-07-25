import styled from "styled-components";

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-column-gap: 12px;
  align-items: center;
`;

export const GridColumn = styled.div<{ span: number }>`
  grid-column: ${({ span }) => `span ${span}`};
`;
