/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import { useQuarterlyIncome } from "../../../../utils/useQuarterlyIncome";
import TextContainer from "../../commons/TextContainer";
import ViewContainer from "../../commons/ViewContainer";
import SidePanel from "./SidePanel";
import Visualization from "./Visualization";

interface IProps {
  title: string;
  setChartDataValues: (
    firstYearCommisionWithoutReserve: number,
    bonus1: number,
    bonus2: number,
    bonus3: number,
    individualCommisionPercentage: number,
    halfReserve: number
  ) => void;
  setPercentageBonusAndIncome: (
    percentageBonus: number,
    income: number
  ) => void;
  duration: number;
  colaborationMonth: number;
  policyNumber: number;
  APEperPolicy: number;
  resetChartValues: () => void;
}

const QuarterlyIncomeCalculator = (props: IProps) => {
  const [
    firstYearCommisionWithoutReserve,
    bonus1,
    bonus2,
    bonus3,
    individualCommisionPercentage,
    halfReserve,
    percentageBonus,
    quarterlyAPE,
  ] = useQuarterlyIncome(
    props.duration,
    props.colaborationMonth,
    props.policyNumber,
    props.APEperPolicy
  );
  useEffect(() => {
    props.resetChartValues();
  }, [props.resetChartValues]);
  useEffect(() => {
    const bonus = percentageBonus * 100;
    const income =
      firstYearCommisionWithoutReserve +
      (bonus1 + bonus2 + bonus3 + quarterlyAPE * percentageBonus) / 3;
    props.setChartDataValues(
      firstYearCommisionWithoutReserve,
      bonus1,
      bonus2,
      bonus3,
      individualCommisionPercentage,
      halfReserve
    );
    props.setPercentageBonusAndIncome(bonus, income || 0);
  }, [
    firstYearCommisionWithoutReserve,
    bonus1,
    bonus2,
    bonus3,
    individualCommisionPercentage,
    halfReserve,
    percentageBonus,
    quarterlyAPE,
  ]);

  return (
    <PageElementWrapper>
      <ViewContainer title={props.title}>
        <Container>
          <SidePanel />
          <Visualization showReserveLegend={halfReserve !== 0} />
        </Container>
        <BottomText>
          <TextContainer
            fontWeight={"600"}
            fontSize={14}
            translationKey={
              "commissionSystem.quaterlyIncomeCalculator.bottomText"
            }
          />
        </BottomText>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default QuarterlyIncomeCalculator;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;

  span {
    display: block;
  }

  @media only screen and (max-width: 1280px) {
    padding: 10px 0;
  }
`;

const BottomText = styled.span`
  position: absolute;
  bottom: 2px;
  right: 10px;
`;
