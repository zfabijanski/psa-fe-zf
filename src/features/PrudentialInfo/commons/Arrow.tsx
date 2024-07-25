import styled from "styled-components/macro";

const Arrow = styled.div<{ direction: "left" | "right" }>`
  width: 0;
  height: 0;
  position: absolute;
  left: ${({ direction }) => (direction === "left" ? "0px" : "auto")};
  right: ${({ direction }) => (direction === "right" ? "0px" : "auto")};
  border-top: 5px solid transparent;
  border-right: ${({ direction, theme }) =>
    direction === "left" ? `10px solid ${theme.newColors.gray100}` : "none"};
  border-left: ${({ direction, theme }) =>
    direction === "right" ? `10px solid ${theme.newColors.gray100}` : "none"};
  border-bottom: 5px solid transparent;
`;

export default Arrow;
