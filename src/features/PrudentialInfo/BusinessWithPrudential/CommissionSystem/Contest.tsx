import React, { FC } from "react";
import styled from "styled-components/macro";
import ContestWorldMap from "../../../../assets/images/contest-world-map.jpg";
import PageElementWrapper from "../../../../components/UI/PageElementWrapper";
import TextContainer from "../../commons/TextContainer";
import ViewContainer from "../../commons/ViewContainer";

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  margin-left: 40px;
  height: 88%;
  z-index: 0;
`;

const WorlMapImage = styled.img`
  position: absolute;
  bottom: 0px;
  right: 5%;
  z-index: -1;
  width: auto;
  object-fit: contain;
  object-position: right;
  height: 60%;

  @media (min-width: 1199px) {
    height: 68%;
  }

  @media (min-width: 1280px) {
    height: 76%;
  }
`;

const TextArea = styled.div`
  white-space: pre-wrap;
  z-index: 0;
  background-color: transparent;
  @media only screen and (max-width: 1280px) {
    padding-right: 80px;
    span {
      font-size: 15px;
    }
  }
`;

const TextRow = styled.div<{ firstChildEmeraldFont?: boolean }>`
  margin-top: 20px;
  span {
    display: block;
  }
  span:first-child {
    color: ${({ firstChildEmeraldFont, theme }) =>
      firstChildEmeraldFont
        ? theme.newColors.primary100
        : theme.newColors.gray100};
  }
`;

interface IProps {
  title: string;
}

interface IText {
  header?: string;
  content: string;
}

const rows: IText[] = [
  { content: "commissionSystem.contest.row1.description" },
  { content: "commissionSystem.contest.row2.description" },
  {
    header: "commissionSystem.contest.row3.header",
    content: "commissionSystem.contest.row3.description",
  },
  {
    header: "commissionSystem.contest.row4.header",
    content: "commissionSystem.contest.row4.description",
  },
  {
    header: "commissionSystem.contest.row5.header",
    content: "commissionSystem.contest.row5.description",
  },
];

const Contest: FC<IProps> = (props) => {
  return (
    <PageElementWrapper>
      <ViewContainer title={props.title}>
        <Container>
          <TextContainer
            fontSize={26}
            translationKey={"commissionSystem.contest.header"}
          />
          <TextArea>
            {rows.map((elt) => (
              <TextRow key={elt.content} firstChildEmeraldFont={!!elt.header}>
                {elt.header && (
                  <TextContainer
                    key={elt.content}
                    fontWeight={"700"}
                    fontSize={18}
                    translationKey={elt.header}
                  />
                )}
                <TextContainer
                  key={elt.header}
                  fontWeight={"600"}
                  fontSize={18}
                  translationKey={elt.content}
                />
              </TextRow>
            ))}
          </TextArea>
          <WorlMapImage src={ContestWorldMap} alt={"world-map"} />
        </Container>
      </ViewContainer>
    </PageElementWrapper>
  );
};

export default Contest;
