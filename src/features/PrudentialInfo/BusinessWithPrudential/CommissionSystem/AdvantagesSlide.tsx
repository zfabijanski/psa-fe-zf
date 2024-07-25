import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import AdvantageIcon from "../../../../assets/icons/advantageIcon.svg";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import PruText from "../../../../components/UI/PruText/PruText";
import CenterContent from "../../commons/CenterContent";
import GridItem from "../../commons/GridItem";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 2fr 1fr;
  justify-content: center;
  padding: 40px;
  align-content: center;

  @media only screen and (max-width: 1280px) {
    padding: 30px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 2fr 1fr;
  }

  @media only screen and (max-width: 1024px) {
    padding-bottom: 0;
  }
`;

const gridElementTitles: string[] = [
  "commissionSystem.commissionSystem.text1",
  "commissionSystem.commissionSystem.text2",
  "commissionSystem.commissionSystem.text3",
  "commissionSystem.commissionSystem.text4",
  "commissionSystem.commissionSystem.text5",
];

interface IProps {
  title: string;
}

const CustomizeGridItem = styled(GridItem)`
  justify-self: center;

  & > div {
    position: relative;
  }

  span {
    position: absolute;
    width: 280px;
    white-space: pre-wrap;
    font-size: 16px;
    top: 10px;
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 14px;
      line-height: 1.1;
    }
  }

  @media only screen and (max-width: 1024px) {
    span {
    }
  }
`;

const InformationText = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }
`;

const CustomizedCenterContent = styled(CenterContent)`
  @media only screen and (max-width: 1024px) {
    padding-bottom: 0;
  }
`;

const AdvantagesSlide: FC<IProps> = ({ title }) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={title}>
        <CustomizedCenterContent>
          <Container>
            {gridElementTitles.map((elt, index) => {
              return (
                <CustomizeGridItem
                  key={elt}
                  text={elt}
                  icon={AdvantageIcon}
                  align={index % 2 ? "end" : "start"}
                />
              );
            })}
            <InformationText>
              <PruText fontSize={16} fontWeight={"600"}>
                <FormattedMessage
                  id={"commissionSystem.commissionSystem.information"}
                />
              </PruText>
            </InformationText>
          </Container>
        </CustomizedCenterContent>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default AdvantagesSlide;
