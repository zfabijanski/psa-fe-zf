import styled from "styled-components";
import { SortOrder } from "./types";
interface IArrowProps {
  order?: SortOrder;
}

const Arrow = styled.span<IArrowProps>`
  height: 25px;
  width: 25px;
  display: block;
  position: relative;
  cursor: pointer;

  &:before,
  &:after {
    border: 4px solid transparent;
    content: "";
    display: block;
    height: 0;
    right: 12px;
    top: 50%;
    position: absolute;
    width: 0;
  }
  &:before {
    border-bottom-color: ${({ order, theme }) =>
      order === "ascend" ? theme.colors.textPrimary : theme.newColors.mono40};
    margin-top: -9px;
  }
  &:after {
    border-top-color: ${({ order, theme }) =>
      order === "descend" ? theme.colors.textPrimary : theme.newColors.mono40};
    margin-top: 1px;
  }
  &:hover {
    opacity: ${({ theme }) => theme.opacityHover};
  }
`;

export const SortingArrow = ({ order }: IArrowProps) => <Arrow order={order} />;

export default SortingArrow;
