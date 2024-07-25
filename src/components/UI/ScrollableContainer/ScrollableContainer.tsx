import styled from "styled-components";
import {
  darkGrayScrollbar,
  narrowXScrollbar,
  narrowYScrollbar,
} from "../../../theme/scrollbar";

export interface IScrollableContainerProps {
  overflowY?: "scroll" | "auto" | null;
  overflowX?: "scroll" | "auto" | null;
  className?: string;
}

export const ScrollableContainer = styled.div<IScrollableContainerProps>`
  height: 100%;
  width: 100%;
  overflow-x: ${({ overflowX }: IScrollableContainerProps) => overflowX};
  overflow-y: ${({ overflowY }: IScrollableContainerProps) => overflowY};

  ${darkGrayScrollbar}
  ${narrowYScrollbar}
  ${narrowXScrollbar}
`;

ScrollableContainer.defaultProps = {
  overflowY: "auto",
};

export default ScrollableContainer;
