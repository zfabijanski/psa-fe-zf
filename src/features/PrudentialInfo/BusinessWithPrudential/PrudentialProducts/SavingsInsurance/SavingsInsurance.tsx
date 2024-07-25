import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../../components/UI/PageElementWrapper";
import PruText from "../../../../../components/UI/PruText/PruText";
import ViewContainer from "../../../commons/ViewContainer";
import ArrowLine from "./ArrowLine";
import BottomTextSection from "./BottomTextSection";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 5px 3fr;
  padding: 30px;

  hr {
    border: none;
    border-left: 2px dashed ${({ theme }) => theme.colors.lightGray};
    height: 100%;
    width: 1px;
  }

  @media only screen and (max-width: 1280px) {
    padding: 40px 30px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 28px;
  }
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  grid-template-rows: 1fr;
`;

const TopTextSection = styled.div<{ align: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  span {
    text-align: ${({ align }) => align};
    white-space: pre-wrap;
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  title: string;
}

const bottomLeftSection = [
  "prudentialProducts.savingsInsurance.text.bottom.left.text1",
  "prudentialProducts.savingsInsurance.text.bottom.left.text2",
  "prudentialProducts.savingsInsurance.text.bottom.left.text3",
  "prudentialProducts.savingsInsurance.text.bottom.left.text4",
  "prudentialProducts.savingsInsurance.text.bottom.left.text5",
];
const bottomCenterSection = [
  "prudentialProducts.savingsInsurance.text.bottom.center.text1",
  "prudentialProducts.savingsInsurance.text.bottom.center.text2",
  "prudentialProducts.savingsInsurance.text.bottom.center.text3",
  "prudentialProducts.savingsInsurance.text.bottom.center.text4",
];
const bottomRightSection = [
  "prudentialProducts.savingsInsurance.text.bottom.right.text1",
  "prudentialProducts.savingsInsurance.text.bottom.right.text2",
  "prudentialProducts.savingsInsurance.text.bottom.right.text3",
  "prudentialProducts.savingsInsurance.text.bottom.right.text4",
];

const SavingsInsurance: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <Container>
          <Section>
            <TopTextSection align={"left"}>
              <PruText fontWeight={"600"} fontSize={18}>
                <FormattedMessage
                  id={"prudentialProducts.savingsInsurance.text.leftTop"}
                />
              </PruText>
            </TopTextSection>
            <hr />
            <ImageContainer />
            <hr />
            <TopTextSection align={"right"}>
              <PruText fontWeight={"600"} fontSize={18}>
                <FormattedMessage
                  id={"prudentialProducts.savingsInsurance.text.rightTop"}
                />
              </PruText>
            </TopTextSection>
          </Section>
          <ArrowLine />
          <Section>
            <BottomTextSection
              title={
                "prudentialProducts.savingsInsurance.text.bottom.left.title"
              }
              bullets={bottomLeftSection}
            />
            <hr />
            <BottomTextSection
              title={
                "prudentialProducts.savingsInsurance.text.bottom.center.title"
              }
              bullets={bottomCenterSection}
              titleColor={"emerald"}
              bulletColor={"emerald"}
            />
            <hr />
            <BottomTextSection
              title={
                "prudentialProducts.savingsInsurance.text.bottom.right.title"
              }
              bullets={bottomRightSection}
            />
          </Section>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default SavingsInsurance;
