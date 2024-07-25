import { useCallback } from "react";
import styled from "styled-components/macro";
import { IBarChartRecord } from "slices/quarterlyIncomeCalculator";
import { formatNumber } from "../../../../../utils/transformers";
import { LegendColor } from "../types";

const getBarHeight = (height: number, minimumHeight: number = 10) => {
  if (height > 0 && height <= minimumHeight) {
    return minimumHeight;
  }
  return height;
};

export interface IBarProps extends IBarChartRecord {
  heightReferenceValue: number;
  showQuarterlyBonus?: boolean;
}

export const Bar = ({
  firstYearProvision,
  monthlyProvision,
  quarterlyBonus,
  reserve,
  heightReferenceValue,
  showQuarterlyBonus,
}: IBarProps) => {
  const getHeightPercentage = useCallback(
    (value: number) => {
      const height = value || 0;
      if (heightReferenceValue !== 0) {
        return Math.floor((height / heightReferenceValue) * 100);
      }
      return 0;
    },
    [heightReferenceValue]
  );
  const data: Array<{ value: number; color: LegendColor }> = [
    { value: quarterlyBonus, color: LegendColor.LightEmerald },
    { value: monthlyProvision, color: LegendColor.Black },
    { value: firstYearProvision, color: LegendColor.DarkGray },
    { value: reserve, color: LegendColor.LightGray },
  ];
  return (
    <Container>
      {data.map((elt) => (
        <BarPart
          key={elt.color}
          bgColor={elt.color}
          height={getHeightPercentage(elt.value)}
          showQuarterlyBonus={showQuarterlyBonus}
        >
          {formatNumber(elt.value)}
        </BarPart>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 5px;
`;

const BarPart = styled.div<{
  bgColor: LegendColor;
  height: number;
  showQuarterlyBonus?: boolean;
}>`
  position: relative;
  width: 100%;
  height: ${({ height }) => `calc(${getBarHeight(height)}% - 2px)`};
  background-color: ${({ bgColor }) => bgColor};
  padding-top: 3px;
  color: ${({ theme }) => theme.newColors.white100};
  font-size: 18px;
  display: ${({ height }) => (height === 0 ? "none" : "flex")};
  justify-content: center;
  margin-top: ${({ bgColor }) =>
    bgColor === LegendColor.LightEmerald ? "0px" : "2px"};
  opacity: ${({ bgColor, showQuarterlyBonus }) => {
    if (bgColor === LegendColor.LightEmerald) {
      return showQuarterlyBonus ? 1 : 0;
    }
    return 1;
  }};
  cursor: default;

  @media only screen and (max-width: 1280px) {
    height: ${({ height }) => `calc(${getBarHeight(height, 15)}% - 2px)`};
  }

  @media only screen and (max-width: 1024px) {
    height: ${({ height }) => `calc(${getBarHeight(height)}% - 2px)`};
  }
`;
