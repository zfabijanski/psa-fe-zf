import React, { FC, ReactNode } from "react";
import styled from "styled-components/macro";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import ScrollableContainer from "../../../../components/UI/ScrollableContainer/ScrollableContainer";
import TextContainer from "../../commons/TextContainer";
import { IBonusRow } from "../../commons/types";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  height: 88%;
  img {
    position: absolute;
    top: 0px;
    left: 39px;
  }

  & > div:first-child {
    position: relative;
  }

  & > div > span {
    margin-left: 100px;
  }

  @media only screen and (max-width: 1280px) {
    height: 52vh;
    span {
      font-size: 24px;
    }
  }
`;

const TextArea = styled.div`
  white-space: pre-wrap;
  margin: 0px 36px 0px 100px;
  @media only screen and (max-width: 1280px) {
    span {
      font-size: 15px;
    }
  }
`;

const TextRow = styled.div`
  margin-top: 20px;
  span {
    display: block;
  }
`;

const BottomText = styled.div`
  position: absolute;
  bottom: -30px;
  right: 10px;

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }
`;

interface IProps {
  title: string;
  header: string;
  rows: IBonusRow[];
  bottomText: string;
  icon: string;
  children?: ReactNode;
}

const BonusViewWrapper: FC<IProps> = (props) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={props.title}>
        <Container>
          <ScrollableContainer>
            <img src={props.icon} alt={"icon"} />
            <TextContainer fontSize={24} translationKey={props.header} />
            <TextArea>
              {props.rows.map((elt) => (
                <TextRow key={elt.header}>
                  <TextContainer
                    key={elt.header}
                    fontSize={16}
                    translationKey={elt.header}
                  />
                  {elt.content && (
                    <TextContainer
                      key={elt.content}
                      fontSize={16}
                      translationKey={elt.content}
                    />
                  )}
                </TextRow>
              ))}
            </TextArea>
            {props.children}
          </ScrollableContainer>
          <BottomText>
            <TextContainer
              fontWeight={"600"}
              fontSize={16}
              translationKey={props.bottomText}
            />
          </BottomText>
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default BonusViewWrapper;
