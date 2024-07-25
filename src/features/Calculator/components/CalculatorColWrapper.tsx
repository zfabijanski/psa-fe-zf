import styled from "styled-components";
import { GridColumn } from "./CalculatorGrid";

interface IProps {
  alignWithDoubleField?: boolean;
}

export const CalculatorColWrapper = styled(GridColumn)<IProps>`
  ${({ alignWithDoubleField }) =>
    alignWithDoubleField ? "margin-top: 26px;" : ""}
`;
