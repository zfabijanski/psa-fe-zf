import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import TextContainer from "../../../../commons/TextContainer";
import { IBasicCommissionData } from "../basicCommissionConfig";
import AnnualCommissionColumn from "./AnnualCommissionColumn";

interface IProps {
  duration: number;
  dataSet: IBasicCommissionData;
  calculateTranslation: (newDuration: number) => number;
}

const Container = styled.div`
  border-radius: 8px;
  width: 700px;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  align-self: center;
  justify-self: center;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1),
    0 6px 30px 5px rgba(0, 0, 0, 0.05), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
  position: relative;

  @media only screen and (max-width: 1280px) {
    height: 85%;
    margin-bottom: 20px;
    align-self: end;
  }

  @media only screen and (max-width: 1024px) {
    height: 80%;
    margin-top: 10px;
    margin-bottom: 0;
    align-self: center;
  }
`;

const Header = styled.div`
  border-radius: 8px 8px 0 0;
  background-color: ${({ theme }) => theme.newColors.primary100};
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${({ theme }) => theme.newColors.white100};
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 22px;
    }
  }
`;

const Rows = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  border-radius: 0 0 8px 8px;
  background-color: ${({ theme }) => theme.newColors.gray100};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  padding-bottom: 20px;

  span {
    color: ${({ theme }) => theme.newColors.white100};
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 18px;
    }
    padding-bottom: 5px;
  }

  @media only screen and (max-width: 1024px) {
    span {
      font-size: 22px;
    }
  }
`;

const AnnualCommissionTable = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
`;

const InfoContainer: FC<IProps> = ({
  duration,
  dataSet,
  calculateTranslation,
}) => {
  const { firstYearCommission, APE_WN, annualCommission } = dataSet[duration];
  const infoContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      infoContainerRef &&
      infoContainerRef.current &&
      infoContainerRef.current.parentElement
    ) {
      const { offsetWidth } = infoContainerRef.current.parentElement;
      const newDistance = Math.floor(
        (calculateTranslation(duration) / 100) *
          (offsetWidth / 2 - infoContainerRef.current.offsetWidth / 2)
      );
      infoContainerRef.current.style.transform = `translateX(${newDistance}px)`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, dataSet]);

  return (
    <Container ref={infoContainerRef}>
      <Header>
        <TextContainer
          fontSize={26}
          translationKey={"commissionSystem.basicCommission.tab.header"}
          values={{ duration }}
        />
      </Header>
      <Content>
        <Rows>
          <TextContainer
            fontSize={26}
            lineHeight={38}
            translationKey={
              "commissionSystem.basicCommission.tab.firstYearCommission"
            }
            values={{ value: firstYearCommission.toString() }}
          />
          <TextContainer
            fontSize={26}
            lineHeight={38}
            translationKey={"commissionSystem.basicCommission.tab.APE_WN"}
            values={{ value: APE_WN.toString() }}
          />
          <TextContainer
            fontSize={26}
            lineHeight={38}
            translationKey={
              "commissionSystem.basicCommission.tab.renewalCommission"
            }
          />
        </Rows>
        <AnnualCommissionTable>
          {annualCommission.map((elt, index) => (
            <AnnualCommissionColumn
              key={elt.label}
              hideBorder={index === annualCommission.length - 1}
              label={elt.label}
              value={elt.value}
            />
          ))}
        </AnnualCommissionTable>
      </Content>
    </Container>
  );
};

export default InfoContainer;
