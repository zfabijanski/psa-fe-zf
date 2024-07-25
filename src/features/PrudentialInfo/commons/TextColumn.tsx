import React, { FC } from "react";
import styled from "styled-components/macro";
import TextContainer from "./TextContainer";
import { ITextColumnContent } from "./types";

const Container = styled.div<Pick<IProps, "hasDescription">>`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: ${({ hasDescription }) => (hasDescription ? "0px" : "68px")};
  text-align: right;
  height: 100%;

  span {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    white-space: pre-wrap;
  }

  @media only screen and (max-width: 1280px) {
    grid-gap: ${({ hasDescription }) => (hasDescription ? "0px" : "52px")};
    span {
      font-size: 15px;
    }
  }

  @media only screen and (max-width: 1024px) {
    grid-gap: ${({ hasDescription }) => (hasDescription ? "0px" : "42px")};
    height: ${({ hasDescription }) => (hasDescription ? "80%" : "100%")};
    align-self: center;
  }
`;

const Section = styled.div`
  position: relative;
  align-self: center;
`;

const Description = styled.div`
  position: relative;
  right: 0;
`;

interface IProps {
  content: ITextColumnContent[];
  boldLabels?: boolean;
  hasDescription?: boolean;
}

const TextColumn: FC<IProps> = ({ content, boldLabels, hasDescription }) => {
  return (
    <Container hasDescription={hasDescription}>
      {content.map((elt) => {
        const { label, description } = elt;
        return (
          <Section key={label}>
            <TextContainer
              fontWeight={boldLabels ? "700" : "600"}
              fontSize={18}
              translationKey={label}
            />
            {description && (
              <Description>
                <TextContainer
                  fontWeight={"600"}
                  fontSize={16}
                  translationKey={description}
                />
              </Description>
            )}
          </Section>
        );
      })}
    </Container>
  );
};

export default TextColumn;
