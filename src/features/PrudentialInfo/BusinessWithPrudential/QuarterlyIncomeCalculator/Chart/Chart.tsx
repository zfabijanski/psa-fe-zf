import React from "react";
import styled from "styled-components/macro";
import { BarChart } from "slices/quarterlyIncomeCalculator";
import TextContainer from "../../../commons/TextContainer";
import { Axis } from "./Axis";
import { Bar } from "./Bar";
import { ChartGrid } from "./ChartGrid";

export interface IChartProps {
  data: BarChart;
  heightReferenceValue: number;
  showChart: boolean;
}

const Chart = ({ data, heightReferenceValue, showChart }: IChartProps) => {
  const leftGridData = [data.month2, data.month3, data.month4];
  const rightGridData = [data.month12, data.month18];
  const rightSideLabels = [
    "commissionSystem.quaterlyIncomeCalculator.chartLabels.labelRight1",
    "commissionSystem.quaterlyIncomeCalculator.chartLabels.labelRight2",
  ];
  return (
    <Container>
      <ChartGrid>
        <LeftGrid>
          {showChart &&
            leftGridData.map((elt, index) => (
              <Bar
                key={`bar${index}`}
                firstYearProvision={elt.firstYearProvision}
                monthlyProvision={elt.monthlyProvision}
                quarterlyBonus={elt.quarterlyBonus}
                reserve={elt.reserve}
                heightReferenceValue={heightReferenceValue}
                showQuarterlyBonus={index === 2}
              />
            ))}
        </LeftGrid>
        <RightGrid>
          {showChart &&
            rightGridData.map((elt, index) => (
              <Bar
                key={`bar${index}`}
                firstYearProvision={elt.firstYearProvision}
                monthlyProvision={elt.monthlyProvision}
                quarterlyBonus={elt.quarterlyBonus}
                reserve={elt.reserve}
                heightReferenceValue={heightReferenceValue}
              />
            ))}
        </RightGrid>
      </ChartGrid>
      <Axis />
      <ChartGrid>
        <LeftGridLabels>
          <Label>
            <TextContainer
              fontWeight={"600"}
              fontSize={18}
              translationKey="commissionSystem.quaterlyIncomeCalculator.chartLabels.labelLeft"
            />
          </Label>
        </LeftGridLabels>
        <RightGrid>
          {rightSideLabels.map((elt) => (
            <Label key={elt}>
              <TextContainer
                fontWeight={"600"}
                fontSize={18}
                translationKey={elt}
              />
            </Label>
          ))}
        </RightGrid>
      </ChartGrid>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 30px 50px;
  padding: 0 10px;

  @media only screen and (max-width: 1280px) {
    grid-template-rows: 1fr 25px 35px;
  }
`;

const LeftGrid = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 2px;
`;

const RightGrid = styled.div`
  display: grid;
  grid-template-columns: 33% 33%;
  justify-content: space-around;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.newColors.gray100};
  text-align: center;
  white-space: pre-wrap;

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 14px;
    }
  }
`;

const LeftGridLabels = styled(LeftGrid)`
  grid-template-columns: 1fr;
`;
