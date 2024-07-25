import React, { FC } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import ViewContainer from "../../../commons/ViewContainer";

import AmountMeter from "../../../../../assets/icons/amount-meter.svg";
import AutomaticProcess from "../../../../../assets/icons/automatic-process.svg";
import Axis from "../../../../../assets/icons/axis.svg";
import NotEqual from "../../../../../assets/icons/not-equal.svg";
import PiggyBank from "../../../../../assets/icons/piggy-bank.svg";

import CenterContent from "../../../commons/CenterContent";
import GridItem from "../../../commons/GridItem";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 4fr 1fr;
  justify-content: center;
  padding: 40px;
  padding-top: 20px;
  align-content: center;

  @media only screen and (max-width: 1280px) {
    height: 85%;
    padding: 10px;
    padding-top: 0px;
    grid-template-rows: 4fr 2fr;
  }

  @media only screen and (max-width: 1024px) {
    height: 410px;
    grid-template-rows: 4fr 1fr;
  }
`;

export interface IPrudentialValues {
  title: string;
  icon: string;
}

const data: IPrudentialValues[] = [
  {
    title: "prudentialProducts.protectiveProducts.automaticProcess",
    icon: AutomaticProcess,
  },
  {
    title: "prudentialProducts.protectiveProducts.piggyBank",
    icon: PiggyBank,
  },
  { title: "prudentialProducts.protectiveProducts.axis", icon: Axis },
  { title: "prudentialProducts.protectiveProducts.notEqual", icon: NotEqual },
  {
    title: "prudentialProducts.protectiveProducts.amountMeter",
    icon: AmountMeter,
  },
];

interface IProps {
  title: string;
}

const CustomizedGridItem = styled(GridItem)<{ color: string }>`
  justify-self: center;

  & > div {
    position: relative;
  }

  span {
    position: absolute;
    width: 280px;
    top: 10px;
    white-space: pre-wrap;
  }

  @media only screen and (max-width: 1280px) {
    span {
      width: 200px;
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 1024px) {
    span {
      width: 170px;
    }
  }
`;

const LifeComfort: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <CenterContent>
          <Container>
            {data.map((elt, index) => {
              return (
                <CustomizedGridItem
                  key={elt.title}
                  text={elt.title}
                  icon={elt.icon}
                  align={index % 2 ? "end" : "start"}
                  color="red"
                />
              );
            })}
          </Container>
        </CenterContent>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default LifeComfort;
