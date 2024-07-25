import styled from "styled-components/macro";

export interface IPruTextProps {
  fontSize?: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28;
  className?: string;
  fontWeight?: string;
  lineHeight?: number;
}

export const PruText = styled.span<IPruTextProps>`
  font-size: ${({ fontSize }) => fontSize && `${fontSize}px`};
  color: ${({ theme }) => theme.newColors.gray100};
  font-weight: ${({ fontWeight }) => fontWeight && `${fontWeight}`};
  line-height: ${({ lineHeight }) => lineHeight && `${lineHeight}px`};
`;

export default PruText;
