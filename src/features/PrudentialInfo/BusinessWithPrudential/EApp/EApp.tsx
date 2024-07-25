import React, { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import LaptopImage from "../../../../assets/images/laptop-image.jpg";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ScrollableContainer from "../../../../components/UI/ScrollableContainer/ScrollableContainer";
import { addNonBreakingSpace } from "../../../../utils/formatters";
import { WhiteSpace } from "../../../../utils/types";
import TextContainer from "../../commons/TextContainer";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  padding-left: 40px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;

  img {
    position: absolute;
    bottom: 30px;
    right: 0;

    @media only screen and (max-width: 1280px) {
      width: 38%;
    }
  }

  span {
    display: block;
  }
`;

const Bullets = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0 20px 0 40px;

    li {
      position: relative;
      margin-bottom: 5px;
    }
  }

  li::before {
    content: "•";
    position: absolute;
    left: -20px;
    font-size: 20px;
    color: ${({ theme }) => theme.newColors.primary100};
  }

  @media only screen and (max-width: 1280px) {
    li span {
      font-size: 14px;
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
`;

const Header = styled.div`
  @media only screen and (max-width: 1024px) {
    span:nth-child(1) {
      font-size: 22px;
    }
    span:nth-child(2) {
      font-size: 15px;
    }
  }
`;

interface IProps {
  title: string;
}

const bullets = [
  "eapp.slide.bullet1",
  "eapp.slide.bullet2",
  "eapp.slide.bullet3",
  "eapp.slide.bullet4",
  "eapp.slide.bullet5",
];

const EApp: FC<IProps> = (props) => {
  const intl = useIntl();
  return (
    <PageElementWrapper>
      <ViewContainer title={props.title} contentBottomPadding={true}>
        <ScrollableContainer>
          <Container>
            <Header>
              <TextContainer
                fontSize={24}
                translationKey={"eapp.slide.header"}
              />
              <TextContainer
                fontSize={16}
                fontWeight={"600"}
                translationKey={"eapp.slide.description"}
              />
            </Header>
            <Content>
              <Bullets>
                <ul>
                  {bullets.map((elt) => (
                    <li key={elt}>
                      <TextContainer
                        fontSize={16}
                        fontWeight={"600"}
                        text={addNonBreakingSpace(
                          intl.formatMessage({ id: elt }),
                          WhiteSpace.NonBreakingSpace
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Bullets>
              <img src={LaptopImage} alt="laptop" />
            </Content>
          </Container>
        </ScrollableContainer>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default EApp;
